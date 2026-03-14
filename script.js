// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Enhanced navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(0, 245, 255, 0.4)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(0, 245, 255, 0.2)';
    }
});

// Active navigation link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced 3D Profile Image Interaction with Smooth Movement
const profileImage = document.querySelector('.profile-image-3d');
let isMouseDown = false;
let mouseX = 0;
let mouseY = 0;
let rotationX = 0;
let rotationY = 0;
let targetRotationX = 0;
let targetRotationY = 0;

// Smooth animation frame function
function animateRotation() {
    rotationX += (targetRotationX - rotationX) * 0.1;
    rotationY += (targetRotationY - rotationY) * 0.1;
    
    if (!isMouseDown) {
        profileImage.style.transform = `perspective(1200px) rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(1.05)`;
    }
    
    requestAnimationFrame(animateRotation);
}

// Start the animation loop
animateRotation();

profileImage.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    profileImage.style.cursor = 'grabbing';
});

profileImage.addEventListener('mousemove', (e) => {
    if (!isMouseDown) {
        // Subtle hover effect with smooth tracking
        const rect = profileImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseXRelative = (e.clientX - centerX) / (rect.width / 2);
        const mouseYRelative = (e.clientY - centerY) / (rect.height / 2);
        
        targetRotationY = mouseXRelative * 20;
        targetRotationX = -mouseYRelative * 20;
        return;
    }
    
    // Enhanced drag rotation with momentum
    const deltaX = e.clientX - mouseX;
    const deltaY = e.clientY - mouseY;
    
    const dragRotationY = deltaX * 0.8;
    const dragRotationX = -deltaY * 0.8;
    
    profileImage.style.transform = `perspective(1200px) rotateY(${dragRotationY}deg) rotateX(${dragRotationX}deg) scale(1.15)`;
    profileImage.style.transition = 'none';
    profileImage.style.boxShadow = `
        0 0 100px rgba(0, 245, 255, 0.9),
        inset 0 0 100px rgba(0, 245, 255, 0.3),
        0 0 120px rgba(157, 78, 221, 0.7),
        0 0 140px rgba(247, 37, 133, 0.5)`;
});

profileImage.addEventListener('mouseup', () => {
    isMouseDown = false;
    profileImage.style.cursor = 'pointer';
    profileImage.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    targetRotationX = 0;
    targetRotationY = 0;
});

profileImage.addEventListener('mouseleave', () => {
    isMouseDown = false;
    profileImage.style.cursor = 'pointer';
    profileImage.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    profileImage.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1)';
    profileImage.style.boxShadow = `
        0 0 50px rgba(0, 245, 255, 0.5),
        inset 0 0 50px rgba(0, 245, 255, 0.1),
        0 0 70px rgba(157, 78, 221, 0.4),
        0 0 90px rgba(247, 37, 133, 0.3)`;
    targetRotationX = 0;
    targetRotationY = 0;
});

// Enhanced touch events for mobile with better physics
profileImage.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isMouseDown = true;
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
});

profileImage.addEventListener('touchmove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - mouseX;
    const deltaY = touch.clientY - mouseY;
    
    const touchRotationY = deltaX * 0.5;
    const touchRotationX = -deltaY * 0.5;
    
    profileImage.style.transform = `perspective(1200px) rotateY(${touchRotationY}deg) rotateX(${touchRotationX}deg) scale(1.1)`;
    profileImage.style.transition = 'none';
});

profileImage.addEventListener('touchend', () => {
    isMouseDown = false;
    profileImage.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1)';
    profileImage.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    targetRotationX = 0;
    targetRotationY = 0;
});

// Scroll animations with enhanced effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            // Add staggered animation for multiple elements
            const children = entry.target.querySelectorAll('.skill-item, .project-card, .blog-card, .timeline-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .blog-card, .timeline-item, .skill-item, section').forEach(el => {
    observer.observe(el);
});

// Enhanced parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const profileContainer = document.querySelector('.profile-container-3d');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (profileContainer && !isMouseDown) {
        const rotationY = scrolled * 0.1;
        profileContainer.style.transform = `rotateY(${rotationY}deg)`;
    }
});

// Enhanced particle effect
function createParticle() {
    const particle = document.createElement('div');
    const colors = ['#00f5ff', '#9d4edd', '#f72585', '#39ff14'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${randomColor};
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        border-radius: 50%;
        box-shadow: 0 0 10px ${randomColor};
        animation: floatUp ${8 + Math.random() * 4}s linear infinite;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 12000);
}

// Enhanced CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.8s ease-out;
    }
`;
document.head.appendChild(style);

// Create particles with varying intervals
setInterval(createParticle, 200);
setInterval(() => createParticle(), 300);
setInterval(() => createParticle(), 500);

// Star rating functionality
const stars = document.querySelectorAll('.star');
let currentRating = 0;

stars.forEach(star => {
    star.addEventListener('click', () => {
        currentRating = parseInt(star.getAttribute('data-rating'));
        updateStars();
    });
    
    star.addEventListener('mouseover', () => {
        const rating = parseInt(star.getAttribute('data-rating'));
        highlightStars(rating);
    });
});

document.querySelector('.star-rating').addEventListener('mouseleave', () => {
    updateStars();
});

function updateStars() {
    stars.forEach(star => {
        const rating = parseInt(star.getAttribute('data-rating'));
        star.classList.toggle('active', rating <= currentRating);
    });
}

function highlightStars(rating) {
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        star.classList.toggle('active', starRating <= rating);
    });
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send the data to a server
    console.log('Contact form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
});

// Feedback form submission
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const suggestions = formData.get('suggestions');
    
    // Here you would typically send the data to a server
    console.log('Feedback submitted:', { rating: currentRating, suggestions });
    
    // Show success message
    alert('Thank you for your feedback!');
    this.reset();
    currentRating = 0;
    updateStars();
});

// Download resume function
function downloadResume() {
    // This would typically trigger a download of the actual resume file
    alert('Resume download would start here. Please provide the resume PDF file.');
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Typing effect for hero title (optional enhancement)
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

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .glitch');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Add glitch effect to project cards on hover
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch 0.3s ease-in-out';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
});

// Smooth reveal animations for sections
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, revealOptions);

// Apply reveal animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease-out';
    revealObserver.observe(section);
});

// Hero section should be visible immediately
document.querySelector('#home').style.opacity = '1';
document.querySelector('#home').style.transform = 'translateY(0)';

console.log('Enhanced futuristic portfolio with improved fonts and 3D effects loaded successfully! 🚀');
