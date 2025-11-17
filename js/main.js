// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(45deg) translate(5px, 5px)' 
            : 'none';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(-45deg) translate(7px, -6px)' 
            : 'none';
    });
}

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Destination Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const destinationCards = document.querySelectorAll('.destination-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            destinationCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            document.getElementById('nameError').textContent = 'Name is required';
            isValid = false;
        } else if (name.value.trim().length < 2) {
            document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email';
            isValid = false;
        }
        
        // Validate message
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            document.getElementById('messageError').textContent = 'Message is required';
            isValid = false;
        } else if (message.value.trim().length < 10) {
            document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            contactForm.style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                document.getElementById('formSuccess').style.display = 'none';
            }, 3000);
        }
    });
}

// Scroll Animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.destination-card, .feature, .tour-card, .value-card, .team-member');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Smooth scroll for anchor links
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
