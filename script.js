$(document).ready(function() {
    // Rotating text animation
    function initRotatingText() {
        const rotatingElement = $('.rotating-text');
        if (rotatingElement.length) {
            const words = rotatingElement.data('words').split(',');
            let currentIndex = 0;
            
            // Start rotation after initial display
            setTimeout(function() {
                setInterval(function() {
                    // Add fade out class
                    rotatingElement.addClass('fade-out');
                    
                    setTimeout(function() {
                        currentIndex = (currentIndex + 1) % words.length;
                        rotatingElement.text(words[currentIndex]);
                        rotatingElement.removeClass('fade-out');
                    }, 300); // Wait for fade out to complete
                }, 2000); // Change text every 3 seconds
            }, 2000); // Wait 2 seconds before starting rotation
        }   
    }
    
    // Initialize rotating text
    initRotatingText();
    
    // Hamburger menu toggle
    $('#hamburgerBtn').on('click', function() {
        $(this).toggleClass('active');
        $('#mobileMenu').toggleClass('active');
    });
    
    // Close mobile menu when clicking on links
    $('.mobile-menu-link').on('click', function() {
        $('#hamburgerBtn').removeClass('active');
        $('#mobileMenu').removeClass('active');
    });
    
    // Close mobile menu when clicking outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.header').length) {
            $('#hamburgerBtn').removeClass('active');
            $('#mobileMenu').removeClass('active');
        }
    });
    
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        var targetId = this.getAttribute('href');
        var target = $(targetId);
        
        if (target.length) {
            event.preventDefault();
            
            // Try smooth scrolling with jQuery
            try {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 100
                }, 500, 'swing');
            } catch (e) {
                // Fallback to native browser scrolling
                target[0].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Navigation background change on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    // Animate elements on scroll
    function animateOnScroll() {
        $('.feature-card, .benefit-item, .access-card').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    }

    // Run animation on scroll
    $(window).on('scroll', animateOnScroll);
    
    // Run animation on page load
    animateOnScroll();

    // CTA button click handlers
    $('.btn-accent, .btn-primary').click(function() {
        $('html, body').animate({
            scrollTop: $('#contact').offset().top - 100
        }, 800, 'swing');
    });

    // Real-time validation
    var validationRules = {
        name: {
            required: true,
            minLength: 2,
            messages: {
                required: 'Name is required',
                minLength: 'Name must be at least 2 characters long'
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            messages: {
                required: 'Email address is required',
                pattern: 'Please enter a valid email address'
            }
        },
        business: {
            required: false,
            maxLength: 500,
            messages: {
                maxLength: 'Business description must be less than 500 characters'
            }
        }
    };

    // Real-time validation on input/blur
    $('#earlyAccessForm input, #earlyAccessForm select, #earlyAccessForm textarea').on('input blur', function() {
        var fieldId = $(this).attr('id');
        var fieldValue = $(this).val().trim();
        var rules = validationRules[fieldId];
        
        if (rules) {
            var isValid = validateField(fieldId, fieldValue, rules);
            updateFieldState(fieldId, isValid, rules);
        }
    });

    function validateField(fieldId, value, rules) {
        var isValid = true;
        var message = '';
        
        // Check required
        if (rules.required && value === '') {
            isValid = false;
            message = rules.messages.required;
        }
        // Check minimum length
        else if (rules.minLength && value.length < rules.minLength) {
            isValid = false;
            message = rules.messages.minLength;
        }
        // Check pattern (for email)
        else if (rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            message = rules.messages.pattern;
        }
        // Check maximum length
        else if (rules.maxLength && value.length > rules.maxLength) {
            isValid = false;
            message = rules.messages.maxLength;
        }
        
        // Store validation result
        $('#' + fieldId).data('isValid', isValid);
        $('#' + fieldId).data('validationMessage', message);
        
        return isValid;
    }

    function updateFieldState(fieldId, isValid, rules) {
        var $field = $('#' + fieldId);
        var $group = $field.parent();
        var $message = $group.find('.validation-message');
        var message = $field.data('validationMessage');
        
        // Remove previous states
        $group.removeClass('has-error has-success');
        $message.removeClass('error success show');
        
        // Only show validation states if field has been interacted with
        if ($field.val().trim() !== '' || $field.is(':focus')) {
            if (isValid) {
                // Only show success for required fields
                if (rules.required) {
                    $group.addClass('has-success');
                    $message.addClass('success show').text('Looks good!');
                }
            } else {
                $group.addClass('has-error');
                $message.addClass('error show').text(message);
            }
        } else {
            // Field is empty and not focused - show neutral state
            $message.text('').removeClass('show');
        }
    }

    // Form validation and submission
    $('#earlyAccessForm').on('submit', function(e) {
        e.preventDefault(); // Always prevent default submission
        
        var isValid = true;
        var $form = $(this);
        
        // Validate all fields
        $form.find('input, select, textarea').each(function() {
            var fieldId = $(this).attr('id');
            var fieldValue = $(this).val().trim();
            var rules = validationRules[fieldId];
            
            if (rules) {
                var fieldValid = validateField(fieldId, fieldValue, rules);
                updateFieldState(fieldId, fieldValid, rules);
                
                // Only mark form as invalid if field is required or has content but is invalid
                if (!fieldValid && (rules.required || fieldValue !== '')) {
                    isValid = false;
                }
            }
        });
        
        if (!isValid) {
            // Focus on first invalid field
            $form.find('.has-error').first().find('input, select').focus();
            return false;
        }
        
        // Show loading state
        var submitBtn = $form.find('button[type="submit"]');
        var originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Submitting...');
        submitBtn.prop('disabled', true);
        
        // Submit to Netlify
        var formData = new FormData(this);
        formData.append('form-name', 'early-access'); // Required for Netlify forms
        
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Form submission failed with status: ' + response.status);
            }
            // Show success popup
            showSuccessMessage();
            // Reset form and validation states
            $form[0].reset();
            $form.find('.form-group').removeClass('has-error has-success');
            $form.find('.validation-message').removeClass('error success show').text('');
            // Clear textarea data
            $form.find('textarea').removeData('isValid validationMessage');
        })
        .catch(function(error) {
            // Show error message
            showFormError('Sorry, there was an error submitting your form. Please try again.');
        })
        .finally(function() {
            // Reset button state
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
        });
    });

    function showFormError(message) {
        var errorHtml = '<div class="error-message form-error" style="margin-top: 1rem; text-align: center;">' + message + '</div>';
        $('.form-error').remove(); // Remove previous errors
        $('#earlyAccessForm').append(errorHtml);
        
        // Auto-remove after 5 seconds
        setTimeout(function() {
            $('.form-error').fadeOut(function() {
                $(this).remove();
            });
        }, 5000);
    }

    function showSuccessMessage() {
        var successHtml = `
            <div class="success-message">
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>Welcome to Early Access!</h3>
                    <p>Thank you for joining Lemonoid's early access program. We've received your application and will be in touch within 48 hours with exclusive updates and early access to our platform.</p>
                    <div class="success-actions">
                        <button class="btn btn-accent" onclick="$(this).closest('.success-message').fadeOut();">
                            <i class="fas fa-check"></i>
                            Got it!
                        </button>
                        <button class="btn btn-outline" onclick="window.location.href='mailto:hello@lemonoid.ai';">
                            <i class="fas fa-envelope"></i>
                            Contact Us
                        </button>
                    </div>
                    <div class="success-note">
                        <i class="fas fa-gift"></i>
                        <span>Remember: You'll get free access during our beta stage!</span>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(successHtml);
        $('.success-message').fadeIn();
        
        // Auto-close after 8 seconds (longer time for better UX)
        setTimeout(function() {
            $('.success-message').fadeOut(function() {
                $(this).remove();
            });
        }, 8000);
    }

    // Add some interactive effects
    $('.feature-card').hover(
        function() {
            $(this).find('.feature-icon').addClass('pulse');
        },
        function() {
            $(this).find('.feature-icon').removeClass('pulse');
        }
    );

    // Dashboard hover effects
    $('.dashboard-card').hover(
        function() {
            $(this).css('z-index', 10);
        },
        function() {
            $(this).css('z-index', '');
        }
    );

    // FAQ Accordion functionality
    $('.faq-question').on('click', function(e) {
        e.preventDefault();
        var $question = $(this);
        var $answer = $question.next('.faq-answer');
        
        // Close other items first
        $('.faq-question').not($question).removeClass('active');
        $('.faq-answer').not($answer).removeClass('active');
        
        // Toggle current item
        $question.toggleClass('active');
        $answer.toggleClass('active');
    });
}); 