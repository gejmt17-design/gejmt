document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Sticky Navbar logic
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations (fade-in)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });
    
    // Trigger initial check for elements already in view on load
    setTimeout(() => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);

    // Mobile Menu logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu');
    const mobileMenuCloseBtn = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenuOverlay && mobileMenuCloseBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuCloseBtn.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});

// Anti-Theft & Manipulation Protection
document.addEventListener('contextmenu', event => event.preventDefault()); // Disable right-click

document.addEventListener('dragstart', event => event.preventDefault()); // Disable image/element dragging

document.addEventListener('selectstart', event => event.preventDefault()); // Disable text selection

// Disable common developer tools shortcuts to prevent inspection
document.addEventListener('keydown', (e) => {
    // Prevent F12
    if (e.key === 'F12') {
        e.preventDefault();
    }
    // Prevent Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element select)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
    }
    // Prevent Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
    }
});
