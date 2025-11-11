document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only prevent default for hash links, not for other anchors
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerOffset = 100; // Account for fixed header
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Handle both forms
    const forms = document.querySelectorAll('.signup-form, .cta-form');

    forms.forEach(function(form) {
        const emailInput = form.querySelector('.email-input, .cta-email-input');
        const submitBtn = form.querySelector('.btn-submit, .cta-btn-submit');
        const originalBtnText = submitBtn.innerHTML;

        setupForm(form, emailInput, submitBtn, originalBtnText);
    });
    
    function setupForm(form, emailInput, submitBtn, originalBtnText) {
    
    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show error message
    function showError(message) {
        // Remove existing error
        const existingError = form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create new error element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        form.appendChild(errorDiv);
        
        // Auto-remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    // Show success message
    function showSuccess() {
        const successHtml = `
            <div class="success-message" style="display: block;">
                <div class="success-content">
                    <i data-lucide="check-circle"></i>
                    <h3>You're on the list!</h3>
                    <p>Thanks for signing up! We'll notify you as soon as PostPulse launches with exclusive early access.</p>
                    <div class="success-actions">
                        <button class="btn-close" onclick="this.closest('.success-message').remove();">
                            Got it!
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', successHtml);
        
        // Initialize icons in the new content
        lucide.createIcons();
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            const successMsg = document.querySelector('.success-message');
            if (successMsg) {
                successMsg.remove();
            }
        }, 8000);
    }
    
    // Set loading state
    function setLoading(loading) {
        if (loading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="loading"></i> Signing up...';
            lucide.createIcons();
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            lucide.createIcons();
        }
    }
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        
        // Remove any existing error messages
        const existingError = form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validation
        if (!email) {
            showError('Please enter your email address');
            emailInput.focus();
            return;
        }
        
        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            emailInput.focus();
            return;
        }
        
        // Set loading state
        setLoading(true);
        
        // Prepare form data for Netlify
        const formData = new FormData(form);
        
        // Submit to Netlify
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(function() {
            // Success
            form.reset();
            showSuccess();
            
            // Track successful signup
            if (typeof gtag !== 'undefined') {
                gtag('event', 'sign_up', {
                    'event_category': 'engagement',
                    'event_label': 'early_access'
                });
            }
        })
        .catch(function(error) {
            console.error('Error:', error);
            showError('Something went wrong. Please try again.');
        })
        .finally(function() {
            setLoading(false);
        });
    });
    
    // Keyboard navigation enhancement
    emailInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
    
    // Focus management
    emailInput.addEventListener('focus', function() {
        // Remove any existing error messages
        const existingError = form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
    });
    }
});