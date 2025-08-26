document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Form handling
    const form = document.querySelector('.signup-form');
    const emailInput = form.querySelector('.email-input');
    const submitBtn = form.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerHTML;
    
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
                    <p>Thanks for signing up! We'll notify you as soon as Lemonoid launches.</p>
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
        
        // Auto-remove after 6 seconds
        setTimeout(() => {
            const successMsg = document.querySelector('.success-message');
            if (successMsg) {
                successMsg.remove();
            }
        }, 6000);
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
        
        // Remove error styling
        this.classList.remove('error');
        
        // Remove any existing error messages
        const existingError = form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Validate if there's content
        if (email && !validateEmail(email)) {
            this.classList.add('error');
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
            emailInput.classList.add('error');
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
            emailInput.classList.remove('error');
            showSuccess();
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
        this.classList.remove('error');
        
        // Remove any existing error messages
        const existingError = form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
    });
    
    // Auto-focus email input on page load (optional UX enhancement)
    setTimeout(() => {
        emailInput.focus();
    }, 500);
});