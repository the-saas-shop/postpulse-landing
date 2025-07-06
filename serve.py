#!/usr/bin/env python3
"""
Simple HTTP server to serve the Lemonoid landing page locally.
Usage: python3 serve.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = "."  # Serve the current directory

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    # Check if index.html exists in the current directory
    index_path = Path("index.html")
    if not index_path.exists():
        print(f"Error: index.html not found in the current directory!")
        print("Make sure you're running this from the lemonoid-landing directory.")
        sys.exit(1)
    
    # Start the server
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        server_url = f"http://localhost:{PORT}"
        print(f"🍋 Lemonoid Landing Page Server")
        print(f"📁 Serving directory: current directory")
        print(f"🌐 Server running at: {server_url}")
        print(f"🚀 Opening browser...")
        print(f"⏹️  Press Ctrl+C to stop the server")
        
        # Open the browser
        webbrowser.open(server_url)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n👋 Server stopped. Thanks for using Lemonoid!")
            httpd.shutdown()

if __name__ == "__main__":
    main() 