// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Scroll event listener
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    
    // Add scroll effect to navigation
    const nav = document.querySelector('.nav-glass');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.12)';
        nav.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.45)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.18)';
        nav.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all glass cards for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.style.transform = 'translateY(30px)';
        card.style.opacity = '1';
        card.style.transition = 'transform 0.6s ease';
        observer.observe(card);
    });
    
    // Initial active nav link
    updateActiveNavLink();
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !subject || !message) {
        showNotification('Veuillez remplir tous les champs.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Veuillez entrer une adresse email valide.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showNotification('Message envoyé avec succès! Je vous répondrai bientôt.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(4px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        padding: 1rem 1.5rem;
        color: white;
        max-width: 350px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.borderLeft = '4px solid #e5e5e5';
    } else if (type === 'error') {
        notification.style.borderLeft = '4px solid #b5b5b5';
    }
    
    document.body.appendChild(notification);
    
    // Slide in animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-glass');
    
    if (heroSection && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Skill cards hover effect
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.45)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
        });
    });
});

// Project cards hover effect
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.45)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
        });
    });
});

// Timeline items animation
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '1';
        item.style.transition = 'transform 0.6s ease';
        
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        
        timelineObserver.observe(item);
    });
});

// Contact info items animation
document.addEventListener('DOMContentLoaded', () => {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach((item, index) => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'transform 0.5s ease';
        
        setTimeout(() => {
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Form input focus effects
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Smooth reveal animation for sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'transform 0.8s ease';
        sectionObserver.observe(section);
    });
});

// Add mobile navigation styles
const mobileNavStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.18);
            backdrop-filter: blur(4px);
            border-radius: 0 0 10px 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
            flex-direction: column;
            padding: 2rem;
            gap: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Add mobile styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileNavStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical resources
window.addEventListener('load', () => {
    // Preload Font Awesome icons
    const iconPreload = document.createElement('link');
    iconPreload.rel = 'preload';
    iconPreload.as = 'style';
    iconPreload.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(iconPreload);
});

// GitHub Projects Carousel
document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.carousel-project');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    let currentProject = 0;

    function showProject(index) {
        // Hide all projects
        projects.forEach(project => {
            project.classList.remove('active');
        });
        
        // Remove active from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show current project
        if (projects[index]) {
            projects[index].classList.add('active');
            indicators[index].classList.add('active');
        }
        
        currentProject = index;
    }

    // Next project
    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentProject + 1) % projects.length;
        showProject(nextIndex);
    });

    // Previous project
    prevBtn.addEventListener('click', () => {
        const prevIndex = (currentProject - 1 + projects.length) % projects.length;
        showProject(prevIndex);
    });

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showProject(index);
        });
    });

    // Gallery functionality for each project
    projects.forEach(project => {
        const galleryImages = project.querySelectorAll('.gallery-image');
        const thumbnails = project.querySelectorAll('.thumbnail');

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                // Remove active from all images and thumbnails
                galleryImages.forEach(img => img.classList.remove('active'));
                thumbnails.forEach(thumb => thumb.classList.remove('active'));

                // Add active to clicked thumbnail and corresponding image
                thumbnail.classList.add('active');
                if (galleryImages[index]) {
                    galleryImages[index].classList.add('active');
                }
            });
        });

        // Add click to enlarge functionality for gallery images
        galleryImages.forEach(image => {
            image.addEventListener('click', () => {
                openImageModal(image.src, image.alt);
            });
        });
    });

    // Auto-advance carousel every 8 seconds
    setInterval(() => {
        const nextIndex = (currentProject + 1) % projects.length;
        showProject(nextIndex);
    }, 8000);
});

// GitHub Projects scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const githubSection = document.querySelector('.github-projects-section');
    
    const githubObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const carouselProject = entry.target.querySelector('.carousel-project.active');
                if (carouselProject) {
                    carouselProject.style.transform = 'translateY(0) scale(1)';
                    carouselProject.style.opacity = '1';
                }
            }
        });
    }, { threshold: 0.2 });
    
    if (githubSection) {
        githubObserver.observe(githubSection);
        
        // Initial setup
        const activeProject = githubSection.querySelector('.carousel-project.active');
        if (activeProject) {
            activeProject.style.opacity = '1';
            activeProject.style.transform = 'translateY(20px) scale(0.98)';
            activeProject.style.transition = 'all 0.8s ease';
        }
    }
});

// Image Modal Functionality
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

function openImageModal(imageSrc, imageAlt) {
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeImageModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
    setTimeout(() => {
        modalImage.src = '';
        modalImage.alt = '';
    }, 300);
}

// Modal close events
modalClose.addEventListener('click', closeImageModal);

imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeImageModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        closeImageModal();
    }
});

console.log('Portfolio JavaScript loaded successfully! 🚀');
