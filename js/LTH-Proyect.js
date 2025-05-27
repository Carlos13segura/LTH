document.addEventListener('DOMContentLoaded', function() {
  // Create hexagon background
  createHexagonBackground();
  
  // Initialize carousels
  initCarMapSlider();
  initConoceSlider();
  
  // Add animation classes to elements as they scroll into view
  initScrollAnimations();
});

// Create hexagon background
function createHexagonBackground() {
  const hexagonBg = document.createElement('div');
  hexagonBg.className = 'hexagon-bg';
  
  // Create 10 hexagons
  for (let i = 0; i < 10; i++) {
    const hexagon = document.createElement('div');
    hexagon.className = 'hexagon';
    hexagonBg.appendChild(hexagon);
  }
  
  document.body.appendChild(hexagonBg);
}

// Initialize car map slider
function initCarMapSlider() {
  const slides = document.querySelectorAll('.car-map-slider__slide');
  if (slides.length === 0) return;
  
  // Create navigation dots
  const carMapSlider = document.querySelector('.car-map-slider');
  const navContainer = document.createElement('div');
  navContainer.className = 'carousel-nav';
  
  slides.forEach((slide, index) => {
    // Show first slide by default
    if (index === 0) {
      slide.classList.add('active');
    }
    
    // Create navigation dot
    const dot = document.createElement('div');
    dot.className = 'carousel-dot';
    if (index === 0) {
      dot.classList.add('active');
    }
    
    dot.addEventListener('click', () => {
      // Remove active class from all slides and dots
      slides.forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.carousel-dot').forEach(d => d.classList.remove('active'));
      
      // Add active class to current slide and dot
      slides[index].classList.add('active');
      dot.classList.add('active');
    });
    
    navContainer.appendChild(dot);
  });
  
  carMapSlider.appendChild(navContainer);
  
  // Auto-rotate slides
  let currentSlide = 0;
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    document.querySelectorAll('.carousel-dot').forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.carousel-dot')[currentSlide].classList.add('active');
  }, 5000);
}

// Initialize conoce slider
function initConoceSlider() {
  const slides = document.querySelectorAll('.conoce-slider__item');
  if (slides.length === 0) return;
  
  // Create navigation dots
  const conoceSlider = document.querySelector('.conoce-slider');
  const navContainer = document.createElement('div');
  navContainer.className = 'carousel-nav';
  
  slides.forEach((slide, index) => {
    // Show first slide by default
    if (index === 0) {
      slide.classList.add('active');
    }
    
    // Create navigation dot
    const dot = document.createElement('div');
    dot.className = 'carousel-dot';
    if (index === 0) {
      dot.classList.add('active');
    }
    
    dot.addEventListener('click', () => {
      // Remove active class from all slides and dots
      slides.forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.conoce-slider .carousel-dot').forEach(d => d.classList.remove('active'));
      
      // Add active class to current slide and dot
      slides[index].classList.add('active');
      dot.classList.add('active');
    });
    
    navContainer.appendChild(dot);
  });
  
  conoceSlider.appendChild(navContainer);
  
  // Auto-rotate slides
  let currentSlide = 0;
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    document.querySelectorAll('.conoce-slider .carousel-dot').forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.conoce-slider .carousel-dot')[currentSlide].classList.add('active');
  }, 4000);
}

// Initialize scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.lth-hero, .card, .content-block');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Add pulse animation to important elements
function addPulseToElements() {
  const importantElements = document.querySelectorAll('.logo-lth, .button-lth-protect, .button-lth-solid-protect');
  
  importantElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.classList.add('pulse');
    });
    
    element.addEventListener('mouseleave', () => {
      element.classList.remove('pulse');
    });
  });
}