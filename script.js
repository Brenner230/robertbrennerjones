// Automatically update the footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for smooth fade-in animations on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Dynamic Typing Effect for Hero
const typedTextSpan = document.getElementById("typing-text");
const textArray = ["Senior Business Development.", "Strategic Growth Leader.", "Business Development Manager at Verizon."];
const typingDelay = 50;
const erasingDelay = 30;
const newTextDelay = 1200; 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    if(textArrayIndex >= textArray.length - 1) return; // Stop on last phrase
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    setTimeout(type, typingDelay + 500);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(textArray.length) setTimeout(type, newTextDelay);
});


// Dark/Light Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
}

themeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
});


// UPDATED: Accordion Logic (Now fills the adjacent timeline dot)
const accordions = document.querySelectorAll('.accordion-header');

accordions.forEach(acc => {
    acc.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        const icon = this.querySelector('.accordion-icon');
        
        // Find the corresponding timeline dot (if it exists)
        const timelineItem = this.closest('.timeline-item');
        const dot = timelineItem ? timelineItem.querySelector('.timeline-dot') : null;
        
        if (content.style.maxHeight) {
            // Close it
            content.style.maxHeight = null;
            if (icon) icon.textContent = '+';
            if (dot) dot.classList.remove('active'); // Remove fill
        } else {
            // Open it
            content.style.maxHeight = content.scrollHeight + "px";
            if (icon) icon.textContent = '−'; 
            if (dot) dot.classList.add('active'); // Add fill
        }
    });
});

// Expand / Collapse All Button Logic
function toggleAllAccordions(action) {
    accordions.forEach(acc => {
        const content = acc.nextElementSibling;
        const icon = acc.querySelector('.accordion-icon');
        const timelineItem = acc.closest('.timeline-item');
        const dot = timelineItem ? timelineItem.querySelector('.timeline-dot') : null;
        
        if (action === 'expand') {
            acc.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
            if (icon) icon.textContent = '−';
            if (dot) dot.classList.add('active');
        } else if (action === 'collapse') {
            acc.classList.remove('active');
            content.style.maxHeight = null;
            if (icon) icon.textContent = '+';
            if (dot) dot.classList.remove('active');
        }
    });
}

document.getElementById('expandAll').addEventListener('click', () => toggleAllAccordions('expand'));
document.getElementById('collapseAll').addEventListener('click', () => toggleAllAccordions('collapse'));


// Scrollspy (Active Nav Link Highlighting)
const sections = document.querySelectorAll('.section-block');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY + 150; 

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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


// Animate Progress Bars on Scroll
const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.progress');
            bars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.animate-bars').forEach(widget => {
    progressObserver.observe(widget);
});


// Back to Top Button Logic
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// Modal PDF Viewer Logic
const modal = document.getElementById('certModal');
const certFrame = document.getElementById('certFrame');

function openModal(pdfUrl) {
    certFrame.src = pdfUrl; 
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    modal.style.display = 'none';
    certFrame.src = ""; 
    document.body.style.overflow = 'auto'; 
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}


// Interactive Slideshow Logic
const track = document.getElementById('testimonialTrack');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;
let slideInterval;

// Initialize Dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function moveSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateSlider();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        moveSlide(1);
    }, 8000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

startAutoSlide();

// Mobile Swipe Support for Slider
let touchstartX = 0;
let touchendX = 0;

track.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
  clearInterval(slideInterval); 
}, {passive: true});

track.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  handleSwipe();
  startAutoSlide(); 
}, {passive: true});

function handleSwipe() {
  if (touchendX < touchstartX - 50) {
    moveSlide(1);
  }
  if (touchendX > touchstartX + 50) {
    moveSlide(-1);
  }
}

// AJAX Form Submission (Prevents Formspree Redirect)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtnText = document.getElementById('btn-text');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        submitBtnText.textContent = "Sending...";
        
        const data = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.innerHTML = "✅ Message sent successfully! I'll be in touch soon.";
                formStatus.style.color = "var(--accent-color)";
                formStatus.style.display = "block";
                contactForm.reset();
            } else {
                formStatus.innerHTML = "❌ Oops! There was a problem submitting your form.";
                formStatus.style.color = "red";
                formStatus.style.display = "block";
            }
        } catch (error) {
            formStatus.innerHTML = "❌ Oops! Network error. Please try again.";
            formStatus.style.color = "red";
            formStatus.style.display = "block";
        }
        
        submitBtnText.textContent = "Send Message";
        setTimeout(() => {
            formStatus.style.display = "none";
        }, 5000);
    });
}

// Smooth scrolling for scroll indicator
document.querySelector('.scroll-indicator').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
    });
});