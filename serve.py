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
DIRECTORY = "v2"  # Serve the v2 directory

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    # Check if v2 directory exists
    if not os.path.exists(DIRECTORY):
        print(f"Error: Directory '{DIRECTORY}' not found!")
        print("Make sure you're running this from the lemonoid-landing directory.")
        sys.exit(1)
    
    # Check if index.html exists in v2 directory
    index_path = Path(DIRECTORY) / "index.html"
    if not index_path.exists():
        print(f"Error: index.html not found in {DIRECTORY} directory!")
        sys.exit(1)
    
    # Start the server
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        server_url = f"http://localhost:{PORT}"
        print(f"🍋 Lemonoid Landing Page Server")
        print(f"📁 Serving directory: {DIRECTORY}")
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