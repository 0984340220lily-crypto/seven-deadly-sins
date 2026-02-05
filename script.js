/* ============================================
   七大罪 - JavaScript Interactions
   怪誕風格網站設計
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavigation();
    initScrollEffects();
    initSinCards();
    initEyeTracking();
    initCharacterStories();
});

/* ============================================
   Particles Background
   ============================================ */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 20 + 10;
    const animationDelay = Math.random() * 10;
    const opacity = Math.random() * 0.5 + 0.1;

    // Random colors
    const colors = ['#8b0000', '#ff4444', '#4a0000', '#ff6b6b', '#9b59b6', '#e74c3c'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        background: ${color};
        animation: float ${animationDuration}s infinite ease-in-out;
        animation-delay: -${animationDelay}s;
        opacity: ${opacity};
    `;

    container.appendChild(particle);
}

/* ============================================
   Navigation
   ============================================ */
function initNavigation() {
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ============================================
   Scroll Effects
   ============================================ */
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sin cards
    document.querySelectorAll('.sin-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe analysis cards
    document.querySelectorAll('.analysis-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Observe table rows
    document.querySelectorAll('.mandala-table tbody tr').forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-30px)';
        row.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
        observer.observe(row);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .sin-card.visible,
        .analysis-card.visible,
        .mandala-table tbody tr.visible {
            opacity: 1 !important;
            transform: translateY(0) translateX(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.scrollY;

        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });
}

/* ============================================
   Sin Cards Interactions
   ============================================ */
function initSinCards() {
    const cards = document.querySelectorAll('.sin-card');

    cards.forEach(card => {
        // Mouse move effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });

        // Click to expand (optional)
        card.addEventListener('click', () => {
            const sin = card.dataset.sin;
            showSinModal(sin);
        });
    });
}

/* ============================================
   Eye Tracking
   ============================================ */
function initEyeTracking() {
    const eye = document.querySelector('.eye-inner');

    if (!eye) return;

    document.addEventListener('mousemove', (e) => {
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const distance = Math.min(8, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 50);

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        eye.style.transform = `translate(${x}px, ${y}px)`;
    });
}

/* ============================================
   Sin Modal (Optional Enhancement)
   ============================================ */
function showSinModal(sin) {
    const sinData = {
        pride: {
            name: '傲慢',
            latin: 'Superbia',
            color: '#9b59b6',
            demon: '路西法 (Lucifer)',
            description: '傲慢被視為七宗罪之首，是所有罪惡的根源。路西法因為傲慢而從天堂墮落，成為魔鬼之王。'
        },
        envy: {
            name: '嫉妒',
            latin: 'Invidia',
            color: '#27ae60',
            demon: '利維坦 (Leviathan)',
            description: '嫉妒如同海中的利維坦，潛伏在深處，吞噬一切美好的事物。'
        },
        wrath: {
            name: '暴怒',
            latin: 'Ira',
            color: '#e74c3c',
            demon: '撒旦 (Satan)',
            description: '暴怒是撒旦的武器，它燃燒理性，將人推向毀滅的深淵。'
        },
        sloth: {
            name: '懶惰',
            latin: 'Acedia',
            color: '#3498db',
            demon: '貝爾芬格 (Belphegor)',
            description: '懶惰讓靈魂沉睡，在虛無中緩慢死亡，這是最隱蔽的罪。'
        },
        greed: {
            name: '貪婪',
            latin: 'Avaritia',
            color: '#f1c40f',
            demon: '瑪門 (Mammon)',
            description: '貪婪永不滿足，它讓人類為了金錢出賣一切，包括自己的靈魂。'
        },
        gluttony: {
            name: '暴食',
            latin: 'Gula',
            color: '#e67e22',
            demon: '別西卜 (Beelzebub)',
            description: '暴食不僅是對食物的渴求，更是對一切感官享受的過度追求。'
        },
        lust: {
            name: '色慾',
            latin: 'Luxuria',
            color: '#e91e63',
            demon: '阿斯莫德 (Asmodeus)',
            description: '色慾的火焰燃燒著理性，讓人沉溺於肉體的快感而忘記靈魂的價值。'
        }
    };

    const data = sinData[sin];
    if (!data) return;

    // Create ripple effect on click
    const card = document.querySelector(`[data-sin="${sin}"]`);
    if (card) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            background: ${data.color};
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
            animation: ripple 0.6s ease-out forwards;
        `;

        card.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    // Add ripple animation
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 300%;
                    height: 300%;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/* ============================================
   Smooth Scroll for Anchor Links
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============================================
   Typing Effect for Hero (Optional)
   ============================================ */
function initTypingEffect() {
    const description = document.querySelector('.hero-description');
    if (!description) return;

    const text = description.innerHTML;
    description.innerHTML = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            if (text.substring(i, i + 4) === '<br>') {
                description.innerHTML += '<br>';
                i += 4;
            } else {
                description.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(typeWriter, 50);
        }
    };

    // Start after a delay
    setTimeout(typeWriter, 1000);
}

/* ============================================
   Table Row Highlight on Hover
   ============================================ */
document.querySelectorAll('.mandala-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', () => {
        const sin = row.dataset.sin;
        const correspondingCard = document.querySelector(`.sin-card[data-sin="${sin}"]`);

        if (correspondingCard) {
            correspondingCard.style.boxShadow = '0 0 30px rgba(139, 0, 0, 0.5)';
        }
    });

    row.addEventListener('mouseleave', () => {
        const sin = row.dataset.sin;
        const correspondingCard = document.querySelector(`.sin-card[data-sin="${sin}"]`);

        if (correspondingCard) {
            correspondingCard.style.boxShadow = '';
        }
    });
});

/* ============================================
   Character Stories - Read More Toggle
   ============================================ */
function initCharacterStories() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.character-card');
            const storyFull = card.querySelector('.story-full');
            const btnText = btn.querySelector('.btn-text');
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // Collapse
                storyFull.hidden = true;
                btn.setAttribute('aria-expanded', 'false');
                btnText.textContent = '閱讀完整故事';
            } else {
                // Expand
                storyFull.hidden = false;
                btn.setAttribute('aria-expanded', 'true');
                btnText.textContent = '收合故事';
            }
        });
    });

    // Add scroll animation for character cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.character-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add visible class styles for character cards
    const style = document.createElement('style');
    style.textContent = `
        .character-card.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* ============================================
   Console Easter Egg
   ============================================ */
console.log('%c☠ 七大罪 ☠', 'font-size: 24px; color: #8b0000; font-family: Georgia;');
console.log('%c歡迎來到深淵...', 'font-size: 14px; color: #ff4444;');
console.log('%c"地獄空蕩蕩，魔鬼在人間" - 莎士比亞', 'font-size: 12px; color: #666; font-style: italic;');
