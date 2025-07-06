# Lemonoid Landing Page

A modern, responsive SaaS landing page built with HTML, CSS, and jQuery. This landing page strictly follows the design system specifications and includes advanced features like form validation, animations, and interactive elements.

## 🚀 Features

### Core Sections
- **Hero Section**: Eye-catching header with CTA button and animated card
- **How It Works**: Three-step process explanation with numbered cards
- **Early Access Benefits**: Four benefit cards explaining the value proposition
- **Join Form**: Complete signup form with validation
- **Footer**: Professional footer with links and social media

### Interactive Features
- ✅ **Form Validation**: Real-time validation with error messages
- ✅ **Smooth Scrolling**: Animated scroll to sections
- ✅ **Phone Formatting**: Auto-format phone numbers as user types
- ✅ **Loading States**: Button loading animations during form submission
- ✅ **Success Modal**: Confirmation message after form submission
- ✅ **Responsive Design**: Mobile-first responsive layout
- ✅ **Hover Effects**: Interactive card and button animations
- ✅ **Parallax Effects**: Subtle parallax scrolling on hero section
- ✅ **Analytics Tracking**: Event tracking for user interactions
- ✅ **Easter Egg**: Hidden Konami code for fun discovery

## 🎨 Design System

The landing page follows a strict design system with:

### Colors
- **Primary**: `#01112C` (Dark Blue)
- **Accent**: `#FCD42F` (Yellow)
- **Background**: `#FFFFFF` (White)
- **Text**: `#333333` (Dark Gray)
- **Muted**: `#777777` (Gray)
- **Border**: `#E5E5E5` (Light Gray)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: `#01112C` with weights 600-700
- **Body**: `#333333` with weight 400

### Components
- **Cards**: White background, subtle shadows, 16px border radius
- **Buttons**: Primary with gradient, secondary with border
- **Icons**: FontAwesome with consistent styling
- **Forms**: Clean inputs with focus states

## 📁 File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling
├── script.js           # jQuery functionality
└── README.md           # This documentation
```

## 🛠️ Setup

1. **Clone or download** the files to your web server
2. **Open** `index.html` in a web browser
3. **No build process** required - pure HTML/CSS/JS

### Dependencies (Loaded via CDN)
- jQuery 3.6.0
- FontAwesome 6.0.0
- Google Fonts (Inter)

## 🎯 Usage

### Customization

#### Update Content
Edit `index.html` to change:
- Company name (currently "Lemonoid")
- Headlines and descriptions
- Feature descriptions
- Footer links

#### Modify Styling
Edit `styles.css` to customize:
- Colors (update CSS variables)
- Typography
- Spacing and layout
- Animation timing

#### Form Integration
In `script.js`, update the `submitForm()` function to:
```javascript
function submitForm(data) {
    // Replace with your API endpoint
    fetch('/api/early-access', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        showSuccessMessage();
    })
    .catch(error => {
        // Handle error
    });
}
```

### Analytics Integration
Replace the placeholder analytics function with your service:
```javascript
function trackEvent(eventName, properties = {}) {
    // Google Analytics 4
    gtag('event', eventName, properties);
    
    // Or Mixpanel
    mixpanel.track(eventName, properties);
    
    // Or your preferred analytics service
}
```

## 🔧 Form Features

### Validation Rules
- **Name**: Minimum 2 characters
- **Email**: Valid email format required
- **Phone**: Auto-formats to (XXX) XXX-XXXX

### Real-time Feedback
- Validation on field blur
- Visual error indicators
- Success states
- Loading animations

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px-1199px (adjusted layout)
- **Mobile**: <768px (stacked layout)

## 🎮 Easter Eggs

Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A

## 🚀 Performance Features

- **Optimized Images**: Vector icons for crisp display
- **Minimal Dependencies**: Only essential libraries
- **Smooth Animations**: Hardware-accelerated CSS
- **Lazy Loading**: Efficient resource loading
- **SEO Optimized**: Semantic HTML structure

## 🔒 Security Features

- **Form Validation**: Client-side validation (always validate server-side too)
- **XSS Prevention**: Proper input sanitization
- **No Inline Scripts**: All JavaScript in external files

## 📈 Analytics Events

The page tracks these events automatically:
- `hero_cta_click`: Hero button clicks
- `form_field_focus`: Form field interactions
- `scroll_depth_X`: Scroll depth milestones (25%, 50%, 75%, 100%)

## 🎨 Customization Examples

### Change Primary Color
```css
/* Replace #01112C throughout styles.css */
.btn-primary {
    background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR 100%);
}
```

### Add New Section
```html
<section class="your-section">
    <div class="container">
        <h2 class="section-heading">Your Section</h2>
        <!-- Your content -->
    </div>
</section>
```

### Modify Form Fields
```html
<div class="form-group">
    <label for="company">Company Name</label>
    <input type="text" id="company" name="company" required>
</div>
```

## 🐛 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📞 Support

For questions or customization help, refer to:
- CSS Grid documentation for layout changes
- jQuery documentation for functionality
- FontAwesome for icon options

## 📄 License

This landing page template is ready for commercial use. Customize as needed for your SaaS product.

---

**Built with ❤️ using pure HTML, CSS, and jQuery** 