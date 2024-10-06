/* scripts.js */

/*
    scripts.js

    This script manages interactive features across the event management website, including:
    - Mobile navigation toggle
    - Event filtering on the Events page
    - Smooth scrolling for CTA buttons
    - Form validation for the Contact Us page
    - Additional interactive functionalities as needed
*/

// Ensure the DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    /* ========================================
       1. Mobile Navigation Toggle
    ======================================== */

    // Create a hamburger menu toggle button for mobile view
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    // Insert the menu toggle before the navigation menu
    const headerContainer = document.querySelector('header .container');
    headerContainer.insertBefore(menuToggle, document.querySelector('nav'));

    // Event listener to toggle the navigation menu on click
    menuToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav ul');
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close the mobile menu when a navigation link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const nav = document.querySelector('nav ul');
            const menuToggle = document.querySelector('.menu-toggle');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    /* ========================================
       2. Event Filtering on Events Page
    ======================================== */

    // Check if the current page is the Events page
    if (document.querySelector('.filter-options')) {
        const filterButtons = document.querySelectorAll('.filter-options button');
        const eventItems = document.querySelectorAll('.event-item');

        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // Remove 'active' class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add 'active' class to the clicked button
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                eventItems.forEach(function(item) {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.classList.contains(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    /* ========================================
       3. Smooth Scrolling for CTA Buttons
    ======================================== */

    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId) || document.querySelector(this.getAttribute('href'));

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjust for fixed header height
                    behavior: 'smooth'
                });
            } else {
                // If target is another page, allow default behavior
                window.location.href = this.getAttribute('href');
            }
        });
    });

    /* ========================================
       4. Contact Form Validation
    ======================================== */

    // Check if the current page is the Contact Us page
    if (document.querySelector('.contact-form')) {
        const contactForm = document.querySelector('.contact-form');
        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const phoneInput = contactForm.querySelector('input[name="phone"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        const submitButton = contactForm.querySelector('button[type="submit"]');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form submission

            // Simple validation checks
            let valid = true;

            // Reset previous error messages
            contactForm.querySelectorAll('.error-message').forEach(msg => msg.remove());

            // Validate Name
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name.');
                valid = false;
            }

            // Validate Email
            if (!validateEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                valid = false;
            }

            // Validate Phone (optional: ensure it's numeric and of certain length)
            if (phoneInput.value.trim() !== '' && !validatePhone(phoneInput.value.trim())) {
                showError(phoneInput, 'Please enter a valid phone number.');
                valid = false;
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter your message.');
                valid = false;
            }

            if (valid) {
                // Submit the form or perform desired actions
                // For demonstration, we'll just show an alert
                alert('Thank you for contacting us! We will get back to you shortly.');
                contactForm.reset();
            }
        });

        // Function to display error messages
        function showError(inputElement, message) {
            const error = document.createElement('span');
            error.classList.add('error-message');
            error.style.color = 'red';
            error.style.fontSize = '0.9rem';
            error.textContent = message;
            inputElement.parentNode.insertBefore(error, inputElement.nextSibling);
        }

        // Function to validate email format
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
            return re.test(String(email).toLowerCase());
        }

        // Function to validate phone number (basic check)
        function validatePhone(phone) {
            const re = /^\+?[0-9]{7,15}$/;
            return re.test(String(phone));
        }
    }

    /* ========================================
       5. Additional Interactive Features
    ======================================== */

    // Example: Toggle visibility of event details on the Events page
    const eventDetailsLinks = document.querySelectorAll('.event-item a');

    eventDetailsLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const eventId = this.getAttribute('href');
            // Logic to display event details, e.g., navigate to event detail page
            // For simplicity, we'll navigate to the individual event page
            window.location.href = eventId;
        });
    });

    // Example: Share buttons on Blog pages
    const shareButtons = document.querySelectorAll('.share-options a');

    shareButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(document.title);
            let shareUrl = '';

            if (this.classList.contains('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (this.classList.contains('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            } else if (this.classList.contains('linkedin')) {
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
            } else if (this.classList.contains('instagram')) {
                // Instagram does not support direct sharing via URL
                alert('Instagram sharing is not supported via web.');
                return;
            }

            // Open the share URL in a new window
            if (shareUrl !== '') {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    /* ========================================
       6. Optional: Lazy Loading Images for Performance
    ======================================== */

    // Implement lazy loading for images to enhance performance
    const lazyImages = document.querySelectorAll('img');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            if (img.getAttribute('data-src')) {
                imageObserver.observe(img);
            }
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }

    /* ========================================
       7. Optional: Initialize Plugins (e.g., Sliders)
    ======================================== */

    // If you plan to use any JavaScript plugins (like carousels or modals),
    // initialize them here. For example, initializing a simple image slider:
    /*
    if (document.querySelector('.slider')) {
        new Slider('.slider', {
            autoplay: true,
            delay: 5000,
            navigation: true,
            pagination: true
        });
    }
    */

    /* ========================================
       8. Additional Custom Scripts
    ======================================== */

    // Add any other custom JavaScript functionalities here as needed
});
