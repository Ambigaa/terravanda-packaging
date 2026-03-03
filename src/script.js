// script.js - Complete JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sticky navbar shadow
    window.addEventListener('scroll', function() {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 10) {
            nav.classList.add('shadow-md');
        } else {
            nav.classList.remove('shadow-md');
        }
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('text-emerald-700', 'border-b-2', 'border-emerald-700');
            link.classList.remove('text-stone-600');
        }
    });

    // Scroll animations
    const faders = document.querySelectorAll('.fade-up');
    const appearOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    faders.forEach(fader => appearOnScroll.observe(fader));

    // Newsletter form validation
    const newsletterForms = document.querySelectorAll('form[id^="newsletter"]');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const msgElement = this.parentNode.querySelector('p[id$="Msg"]');
            
            if (!emailInput.value.trim()) {
                showMessage(msgElement, 'Please enter an email address', 'error');
                return;
            }
            
            if (!isValidEmail(emailInput.value)) {
                showMessage(msgElement, 'Please enter a valid email address', 'error');
                return;
            }
            
            showMessage(msgElement, 'Thanks for subscribing! (Demo)', 'success');
            emailInput.value = '';
        });
    });

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('[name="name"]');
            const business = this.querySelector('[name="business"]');
            const email = this.querySelector('[name="email"]');
            const phone = this.querySelector('[name="phone"]');
            const msg = document.getElementById('formMsg');
            
            let isValid = true;
            
            // Reset borders
            [name, business, email, phone].forEach(field => {
                if (field) field.style.borderColor = '';
            });
            
            // Validation
            if (!name.value.trim()) {
                name.style.borderColor = 'red';
                isValid = false;
            }
            
            if (!business.value.trim()) {
                business.style.borderColor = 'red';
                isValid = false;
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                email.style.borderColor = 'red';
                isValid = false;
            }
            
            if (!phone.value.trim() || !isValidPhone(phone.value)) {
                phone.style.borderColor = 'red';
                isValid = false;
            }
            
            if (isValid) {
                showMessage(msg, 'Form submitted successfully! (Demo)', 'success');
                this.reset();
            } else {
                showMessage(msg, 'Please fill all fields correctly', 'error');
            }
        });
    }

    // Utility functions
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function isValidPhone(phone) {
        return /^[\d\s\-+()]{7,20}$/.test(phone);
    }
    
    function showMessage(element, text, type) {
        if (!element) return;
        element.textContent = text;
        element.style.color = type === 'error' ? '#ef4444' : '#10b981';
        setTimeout(() => {
            element.textContent = '';
        }, 3000);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});