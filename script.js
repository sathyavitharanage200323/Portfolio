document.addEventListener('DOMContentLoaded', () => {
    // 0. Dark / Light Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') document.body.classList.add('light-mode');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // 0b. Typing Animation for Professional Summary
    const typingEl = document.getElementById('typingText');
    const fullText = "I am a passionate UI/UX focused Frontend Developer and IT Undergraduate, dedicated to creating intuitive, responsive, and visually stunning web applications. With a strong foundation in modern web technologies and specific expertise in user-centered design, I bridge the gap between aesthetic product design and robust technical implementation.";
    let charIndex = 0;
    let typingStarted = false;

    function typeChar() {
        if (charIndex < fullText.length) {
            typingEl.textContent += fullText[charIndex];
            charIndex++;
            setTimeout(typeChar, 12);
        }
    }

    // Start typing when the about section scrolls into view
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typingStarted) {
                typingStarted = true;
                setTimeout(typeChar, 400);
                aboutObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const aboutSection = document.getElementById('about');
    if (aboutSection) aboutObserver.observe(aboutSection);

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

    // 5. Skills Tab Switching
    const skillsTabs = document.querySelectorAll('.skills-tab');
    const skillsPanes = document.querySelectorAll('.skills-pane');

    skillsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillsTabs.forEach(t => t.classList.remove('active'));
            skillsPanes.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById('tab-' + tab.dataset.tab);
            if (target) target.classList.add('active');
        });
    });

    // 6. Project Filter
    const filterBtns = document.querySelectorAll('.pf-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                const tags = card.dataset.tags || '';
                if (filter === 'all' || tags.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 7. Project Modal
    const modal = document.getElementById('projModal');
    const modalClose = document.getElementById('projModalClose');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            document.getElementById('modalImg').src = card.dataset.img || '';
            document.getElementById('modalTitle').textContent = card.dataset.title || '';
            document.getElementById('modalDesc').textContent = card.dataset.desc || '';

            // tags
            const tagsEl = document.getElementById('modalTags');
            tagsEl.innerHTML = (card.dataset.tech || '').split(',').map(t =>
                `<span class="tag">${t.trim()}</span>`
            ).join('');

            // action buttons
            const actionsEl = document.getElementById('modalActions');
            actionsEl.innerHTML = '';
            if (card.dataset.github) {
                actionsEl.innerHTML += `<a href="${card.dataset.github}" target="_blank" class="btn btn-secondary" style="font-size:0.95rem;padding:10px 24px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right:8px"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                    View on GitHub
                </a>`;
            }
            if (card.dataset.live) {
                actionsEl.innerHTML += `<a href="${card.dataset.live}" target="_blank" class="btn btn-accent" style="font-size:0.95rem;padding:10px 24px;">
                    🌐 View Live
                </a>`;
            }

            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});

