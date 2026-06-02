document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars specifically when they enter
                if (entry.target.classList.contains('skills-container')) {
                    const skillFills = entry.target.querySelectorAll('.skill-fill');
                    skillFills.forEach(fill => {
                        fill.style.width = fill.getAttribute('data-width');
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Contact Form Interaction
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sent! 🎉';
            btn.style.background = 'var(--tertiary)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

    // 4. Interactive Profile Image
    const heroSection = document.querySelector('.hero');
    const profileImg = document.querySelector('.profile-blob img');
    if (heroSection && profileImg) {
        heroSection.addEventListener('mousemove', (e) => {
            const sectionWidth = heroSection.offsetWidth;
            const mouseX = e.clientX - heroSection.offsetLeft;
            const position = mouseX / sectionWidth;

            if (position < 0.33) {
                profileImg.src = 'profile1.jpg';
            } else if (position < 0.66) {
                profileImg.src = 'profile3.jpg';
            } else {
                profileImg.src = 'profile8.jpg';
            }
        });
    }
});

