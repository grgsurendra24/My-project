document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Header ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // We added display block to main.nav on mobile as a quick toggle, but let's implement a clean slide down or fade.
    // First let's ensure CSS caters for it if toggled via JS class.
    
    let isMenuOpen = false;
    
    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            // Apply inline styles for simplicity since CSS display is none
            mainNav.style.display = 'flex';
            mainNav.style.flexDirection = 'column';
            mainNav.style.position = 'absolute';
            mainNav.style.top = '100%';
            mainNav.style.left = '0';
            mainNav.style.width = '100%';
            mainNav.style.background = 'rgba(15, 17, 21, 0.95)';
            mainNav.style.backdropFilter = 'blur(10px)';
            mainNav.style.padding = '2rem';
            mainNav.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        } else {
            mainNav.style.display = 'none';
        }
    });
    
    // Close mobile menu when a link is clicked
    const navLinksList = document.querySelectorAll('.main-nav a');
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                isMenuOpen = false;
                mainNav.style.display = 'none';
            }
        });
    });

    // Reset inline styles if resizing back to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            mainNav.style.display = 'flex';
            mainNav.style.flexDirection = 'row';
            mainNav.style.position = 'static';
            mainNav.style.background = 'transparent';
            mainNav.style.padding = '0';
            mainNav.style.borderBottom = 'none';
        } else if (!isMenuOpen) {
            mainNav.style.display = 'none';
        }
    });

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // offset for sticky header
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // --- Scroll Reveal Animation ---
    // Simple intersection observer to add a visible class to elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes to elements we want to reveal
    // For simplicity, let's target section headers, cards, and step markers
    const revealElements = document.querySelectorAll('.section-header, .service-card, .feature-card, .testimonial-card, .step, .about-content, .about-image-wrapper');
    
    revealElements.forEach(el => {
        el.classList.add('fade-in-hidden');
        observer.observe(el);
    });

    // Prevent default form submission for demo purposes
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent Successfully';
                submitBtn.style.backgroundColor = '#10b981'; // Success green
                submitBtn.style.color = '#fff';
                submitBtn.style.opacity = '1';
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 1000);
        });
    }
});
