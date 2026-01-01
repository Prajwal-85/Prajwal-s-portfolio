// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const currentYear = document.getElementById('currentYear');

// Theme Toggle Functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(savedTheme + '-mode');
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const isDark = body.classList.contains('dark-mode');
    
    if (isDark) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    }
}

function updateThemeIcon(theme) {
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    
    if (theme === 'dark') {
        sunIcon.style.opacity = '0';
        moonIcon.style.opacity = '1';
    } else {
        sunIcon.style.opacity = '1';
        moonIcon.style.opacity = '0';
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    navLinks.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

// Header scroll effect
function handleScroll() {
    // Header scroll effect
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Animation on scroll
    checkScrollAnimation();
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                if (navLinks.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        });
    });
}

// Back to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Animation on scroll
const animateElements = document.querySelectorAll('.animate-on-scroll');

function checkScrollAnimation() {
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
}

// Skill cards hover effect
function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'pulse 0.5s ease';
        });
        
        card.addEventListener('animationend', () => {
            card.style.animation = '';
        });
    });
}

// Startup idea details buttons
function initIdeaButtons() {
    const ideaButtons = document.querySelectorAll('.idea-details-btn');
    ideaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ideaTitle = this.closest('.idea-card').querySelector('h3').textContent;
            alert(`More details about "${ideaTitle}" would be displayed here. This feature can be expanded to show a modal with detailed information, business plan, market analysis, etc.`);
        });
    });
}

// Form submission handlers
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For demo purposes, we'll just show an alert
    alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you at ${email} as soon as possible.`);
    
    // Reset form
    contactForm.reset();
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    alert(`Thank you for subscribing with ${email}! You'll receive updates on new startup ideas and tech insights.`);
    
    // Reset form
    newsletterForm.reset();
}

// Set current year in footer
function setCurrentYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// Initialize all functionality
function init() {
    // Initialize theme
    initTheme();
    
    // Set current year
    setCurrentYear();
    
    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    menuToggle.addEventListener('click', toggleMobileMenu);
    window.addEventListener('scroll', handleScroll);
    backToTop.addEventListener('click', scrollToTop);
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Form submissions
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Initialize components
    initSmoothScroll();
    initSkillCards();
    initIdeaButtons();
    
    // Initial checks
    handleScroll();
    checkScrollAnimation();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Toggle theme with Ctrl/Cmd + T
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});
