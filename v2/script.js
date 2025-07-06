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

    // Form validation and submission
    $('#earlyAccessForm').on('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        $('.error-message').remove();
        $('.error').removeClass('error');
        
        var isValid = true;
        
        // Validate business name
        var businessName = $('#businessName').val().trim();
        if (businessName === '') {
            showError('#businessName', 'Business name is required');
            isValid = false;
        }
        
        // Validate email
        var email = $('#email').val().trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('#email', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('#email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone
        var phone = $('#phone').val().trim();
        if (phone === '') {
            showError('#phone', 'Phone number is required');
            isValid = false;
        }
        
        // Validate business type
        var businessType = $('#businessType').val();
        if (businessType === '') {
            showError('#businessType', 'Please select your business type');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            var submitBtn = $(this).find('button[type="submit"]');
            var originalText = submitBtn.html();
            submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Submitting...');
            submitBtn.prop('disabled', true);
            
            // Simulate form submission
            setTimeout(function() {
                showSuccessMessage();
                $('#earlyAccessForm')[0].reset();
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
            }, 2000);
        }
    });

    function showError(fieldId, message) {
        $(fieldId).addClass('error');
        $(fieldId).parent().append('<div class="error-message">' + message + '</div>');
    }

    function showSuccessMessage() {
        var successHtml = `
            <div class="success-message">
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>Welcome to Early Access!</h3>
                    <p>Thank you for joining Lemonoid's early access program. We'll be in touch soon with exclusive updates and early access to our platform.</p>
                    <button class="btn btn-accent" onclick="$(this).closest('.success-message').fadeOut();">
                        <i class="fas fa-times"></i>
                        Close
                    </button>
                </div>
            </div>
        `;
        
        $('body').append(successHtml);
        $('.success-message').fadeIn();
        
        // Auto-close after 5 seconds
        setTimeout(function() {
            $('.success-message').fadeOut(function() {
                $(this).remove();
            });
        }, 5000);
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
}); 