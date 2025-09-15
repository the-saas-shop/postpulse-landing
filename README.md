# PostPulse Landing Page

A modern, clean landing page for PostPulse - a content strategy tool that helps creators analyze competitor success and generate winning content ideas.

## 🚀 Features

- **Mobile-First Design**: Optimized for all devices with responsive layouts
- **Clean UI**: Modern design with Inter font and smooth animations
- **Email Capture**: Netlify Forms integration with spam protection
- **Performance Optimized**: Fast loading with minimal dependencies
- **Accessibility**: WCAG compliant with proper semantic HTML

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern CSS with custom properties
- **JavaScript**: Vanilla JS for form handling
- **Icons**: Lucide icons
- **Font**: Inter from Google Fonts
- **Deployment**: Netlify ready

## 📁 Project Structure

```
postpulse-landing/
├── index.html           # Main landing page
├── assets/
│   ├── css/
│   │   └── main.css     # Main stylesheet
│   ├── js/
│   │   └── main.js      # Main JavaScript
│   └── fonts/
│       └── Motter Tektura Normal.ttf  # Custom font
├── favicon.ico
├── logo-lemonoid.png    # Previous logo (can be removed)
├── open-graph.png       # Social media preview
├── serve.py             # Local development server
├── CLAUDE.md            # Project guidelines
└── README.md            # This file
```

## 🚀 Getting Started

### Local Development

1. Clone the repository
2. Navigate to the project directory
3. Run the development server:
   ```bash
   python3 serve.py
   ```
4. Open your browser to `http://localhost:8000`

### Deployment

The project is configured for Netlify deployment:

1. Push to your Git repository
2. Connect to Netlify
3. Deploy with default settings
4. Forms will work automatically with Netlify Forms

## 🎨 Design System

### Colors
- **Primary Black**: #000000
- **Accent Pink**: #FF4B6E (for "Turn" text)
- **Light Gray**: #F5F5F5 (badge background)
- **Medium Gray**: #6B7280 (subheading text)
- **Green Accent**: #DAEB28 (CTA button)
- **White**: #FFFFFF

### Typography
- **Font Family**: Inter
- **Headline**: 800 weight, tight letter spacing
- **Body**: 400 weight, comfortable line height

### Components
- **Logo**: Black pill with white text
- **Badge**: Gray pill with rounded corners
- **Form**: Gray background with inline submit button
- **Button**: Green background with bold text

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (default)
- **Tablet**: 768px+
- **Desktop**: 1024px+

## 🔧 Configuration

### Google Analytics
Update the tracking ID in `index.html`:
```javascript
gtag('config', 'YOUR-GA-ID');
```

### Meta Tags
Update Open Graph and Twitter meta tags with your domain and social preview image.

## 🚢 Production Checklist

- [ ] Update Google Analytics tracking ID
- [ ] Update meta tags with correct URLs
- [ ] Create and add proper favicon
- [ ] Optimize images (convert to WebP)
- [ ] Test form submissions on Netlify
- [ ] Add security headers via Netlify
- [ ] Configure custom domain
- [ ] Set up SSL certificate

## 📄 License

All rights reserved. This is proprietary software.

---

Built for PostPulse - Turn Your Competitors' Success Into Your Content Strategy