# CLAUDE.md

This file provides focused guidance for building simple HTML/CSS/jQuery landing pages with mobile-first design.

## Core Development Philosophy

### KISS (Keep It Simple, Stupid)
Build clean, lightweight landing pages. Avoid unnecessary complexity. Every element should serve a purpose.

### Mobile-First Design
Design and develop for mobile devices first, then enhance for larger screens using CSS media queries.

### Performance First
- Optimize images and assets
- Minimize HTTP requests
- Keep CSS and JS lightweight
- Use semantic HTML for better SEO

## 🎨 Design System

### Color Schema
- **Primary**: #daeb28 (backgrounds, dark text)
- **Accent 1**: #ef476f (CTAs, highlights, important elements)
- **Background**: #fffef9 (For main background)
- **Dark Text Color**: #000 (Dark text color)

### Fonts 
- **Header**: Poppins (Bold)
- **Body**: Poppins

### Typography Scale (Mobile-First)
```css
/* Base: Mobile */
--font-xs: 0.75rem;    /* 12px */
--font-sm: 0.875rem;   /* 14px */
--font-base: 1rem;     /* 16px */
--font-lg: 1.125rem;   /* 18px */
--font-xl: 1.25rem;    /* 20px */
--font-2xl: 1.5rem;    /* 24px */
--font-3xl: 1.875rem;  /* 30px */

/* Tablet: 768px+ */
--font-2xl-md: 2rem;     /* 32px */
--font-3xl-md: 2.25rem;  /* 36px */

/* Desktop: 1024px+ */
--font-3xl-lg: 3rem;     /* 48px */
```

## 🏗️ Project Structure

```
project/
├── index.html           # Main landing page
├── assets/
│   ├── css/
│   │   ├── main.css     # Main stylesheet
│   │   └── components.css # Reusable components
│   ├── js/
│   │   ├── main.js      # Main JavaScript
│   │   └── components.js # Reusable components
│   └── images/          # Optimized images
├── favicon.ico
└── README.md
```

## 📱 Mobile-First CSS Structure

### MANDATORY CSS Organization
```css
/* CSS Reset & Base Styles */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
body { line-height: 1.5; -webkit-font-smoothing: antialiased; }
img, picture, video, canvas, svg { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }

/* CSS Custom Properties */
:root {
  --primary: #01112c;
  --accent-1: #fcd42f;
  --accent-2: #E64848;
  --success: #178569;
  --white: #ffffff;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --container-max: 1200px;
  --section-padding: 2rem 1rem;
}

/* Mobile Base Styles */
body { font-family: var(--font-family); color: var(--primary); }
.container { max-width: var(--container-max); margin: 0 auto; padding: 0 1rem; }
.section { padding: var(--section-padding); }

/* Tablet: 768px+ */
@media (min-width: 768px) {
  :root { --section-padding: 3rem 2rem; }
  .container { padding: 0 2rem; }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  :root { --section-padding: 4rem 2rem; }
}
```

## 🧩 Component Patterns

### Hero Section
```html
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">Your Compelling Headline</h1>
      <p class="hero-description">Clear value proposition in one sentence</p>
      <div class="hero-actions">
        <button class="btn btn-primary">Get Started</button>
        <button class="btn btn-outline">Learn More</button>
      </div>
    </div>
  </div>
</section>
```

### Button Component
```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--accent-1);
  color: var(--primary);
  border-color: var(--accent-1);
}

.btn-primary:hover {
  background: transparent;
  color: var(--accent-1);
}

.btn-outline {
  background: transparent;
  color: var(--primary);
  border-color: var(--primary);
}

/* Tablet+ */
@media (min-width: 768px) {
  .btn { padding: 1rem 2rem; }
}
```

## 🖼️ Icons with Lucide

### CDN Integration
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
```

### Usage Pattern
```html
<!-- In HTML -->
<button class="btn btn-primary">
  <i data-lucide="arrow-right"></i>
  Get Started
</button>

<!-- Initialize in JavaScript -->
<script>
  lucide.createIcons();
</script>
```

### Common Icons for Landing Pages
- `arrow-right` - CTAs, next actions
- `check` - Features, benefits
- `star` - Reviews, ratings  
- `mail` - Contact, newsletter
- `phone` - Contact info
- `map-pin` - Location
- `menu` - Mobile navigation
- `x` - Close modals, dismiss

## 🎯 jQuery Patterns

### Essential jQuery Structure
```javascript
$(document).ready(function() {
  // Mobile menu toggle
  $('.menu-toggle').click(function() {
    $('.mobile-nav').toggleClass('active');
  });
  
  // Smooth scrolling for anchor links
  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 500);
    }
  });
  
  // Form submission
  $('#contact-form').submit(function(e) {
    e.preventDefault();
    // Handle form submission
    showSuccessMessage();
  });
});

function showSuccessMessage() {
  $('.success-message').fadeIn().delay(3000).fadeOut();
}
```

## 📋 HTML Template Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Your page description">
  <title>Your Landing Page</title>
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="icon" href="favicon.ico">
</head>
<body>
  <!-- Header/Navigation -->
  <header class="header">
    <nav class="nav container">
      <div class="nav-brand">
        <a href="#" class="logo">Brand</a>
      </div>
      <div class="nav-menu">
        <!-- Desktop menu -->
        <ul class="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <!-- Mobile toggle -->
        <button class="menu-toggle">
          <i data-lucide="menu"></i>
        </button>
      </div>
    </nav>
    <!-- Mobile menu -->
    <div class="mobile-nav">
      <ul class="mobile-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </header>

  <!-- Main Content -->
  <main>
    <!-- Hero Section -->
    <section class="hero">...</section>
    
    <!-- Features Section -->
    <section id="features" class="features section">...</section>
    
    <!-- Contact Section -->
    <section id="contact" class="contact section">...</section>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 Your Company. All rights reserved.</p>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>
```

## 🚀 Performance Checklist

### MUST Optimize
- [ ] **Images**: Use WebP format, proper sizing, lazy loading
- [ ] **CSS**: Minify, remove unused styles
- [ ] **JavaScript**: Minify, use CDN for jQuery/Lucide
- [ ] **HTML**: Semantic markup, proper meta tags
- [ ] **Fonts**: Use system fonts or optimize web fonts

### Loading Strategy
```html
<!-- Critical CSS inline -->
<style>/* Critical above-fold styles */</style>

<!-- Non-critical CSS -->
<link rel="preload" href="assets/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

<!-- JavaScript at end of body -->
<script src="assets/js/main.js" defer></script>
```

## ⚠️ CRITICAL GUIDELINES

### MUST Follow
1. **Mobile-first design** - Design for mobile, enhance for desktop
2. **Semantic HTML** - Use proper tags for SEO and accessibility
3. **Optimize images** - Compress and use appropriate formats
4. **Keep it lightweight** - Minimal dependencies, fast loading
5. **Test on real devices** - Don't rely only on browser dev tools
6. **Use Lucide icons consistently** - Maintain visual cohesion
7. **Implement proper forms** - Validation and user feedback
8. **Add loading states** - For any async operations

### FORBIDDEN Practices
- **NEVER ignore mobile experience** - Mobile traffic dominates
- **NEVER use large unoptimized images** - Kills performance
- **NEVER forget meta viewport tag** - Breaks mobile responsiveness
- **NEVER use Flash or outdated tech** - Poor compatibility
- **NEVER skip accessibility** - Use alt tags, proper contrast
- **NEVER inline all CSS/JS** - Separate concerns appropriately

## 📱 Responsive Breakpoints
```css
/* Mobile First - Base styles for 320px+ */
/* Tablet - 768px+ */
@media (min-width: 768px) { /* styles */ }
/* Desktop - 1024px+ */
@media (min-width: 1024px) { /* styles */ }
/* Large Desktop - 1280px+ */
@media (min-width: 1280px) { /* styles */ }
```

---

*Focus on simplicity, performance, and mobile-first design.*
*Keep code clean, semantic, and well-organized.*
*Test on real devices for optimal user experience.*