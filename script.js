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


// Accordion Logic for both Experience and Certifications
const accordions = document.querySelectorAll('.accordion-header');

accordions.forEach(acc => {
    acc.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        const icon = this.querySelector('.accordion-icon');
        
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            if (icon) icon.textContent = '+';
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            if (icon) icon.textContent = '−'; 
        }
    });
});


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

// Auto Scroll Logic
function startAutoSlide() {
    slideInterval = setInterval(() => {
        moveSlide(1);
    }, 8000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Start the timer when page loads
startAutoSlide();