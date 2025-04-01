/**
 * Sweet Shuk - Israeli Candy Marketplace
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initHeader();
  initHeroSound();
  initProductCarousel();
  initAnimatedCounters();
  initMobileMenu();
});

/**
 * Header scroll behavior
 */
function initHeader() {
  const header = document.querySelector('.site-header');
  const headerHeight = header.offsetHeight;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Add padding to body equal to header height
  document.body.style.paddingTop = headerHeight + 'px';
}

/**
 * Hero section audio toggle
 */
function initHeroSound() {
  const soundToggle = document.getElementById('soundToggle');
  let audio = null;
  let isPlaying = false;
  
  if (soundToggle) {
    soundToggle.addEventListener('click', function() {
      if (!audio) {
        audio = new Audio('audio/market-sounds.mp3');
        audio.loop = true;
      }
      
      if (isPlaying) {
        audio.pause();
        soundToggle.innerHTML = '<i class="fas fa-volume-up"></i> Hear the Market Sounds';
        isPlaying = false;
      } else {
        audio.play();
        soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i> Mute Market Sounds';
        isPlaying = true;
      }
    });
  }
}

/**
 * Product carousel functionality
 */
function initProductCarousel() {
  const carouselPrev = document.querySelector('.carousel-prev');
  const carouselNext = document.querySelector('.carousel-next');
  const carouselIndicators = document.querySelectorAll('.carousel-indicators span');
  const productCategories = document.querySelectorAll('.product-category');
  
  if (!carouselPrev || !carouselNext || productCategories.length === 0) return;
  
  let currentIndex = 0;
  
  // Hide all products except the first one
  productCategories.forEach((category, index) => {
    if (index !== 0) {
      category.style.display = 'none';
    }
  });
  
  // Update indicators
  function updateIndicators() {
    carouselIndicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  // Previous button
  carouselPrev.addEventListener('click', function() {
    productCategories[currentIndex].style.display = 'none';
    currentIndex = (currentIndex - 1 + productCategories.length) % productCategories.length;
    productCategories[currentIndex].style.display = 'flex';
    updateIndicators();
  });
  
  // Next button
  carouselNext.addEventListener('click', function() {
    productCategories[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % productCategories.length;
    productCategories[currentIndex].style.display = 'flex';
    updateIndicators();
  });
  
  // Indicator buttons
  carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      productCategories[currentIndex].style.display = 'none';
      currentIndex = index;
      productCategories[currentIndex].style.display = 'flex';
      updateIndicators();
    });
  });
}

/**
 * Animated counters
 */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.metric-number');
  
  if (counters.length === 0) return;
  
  const animateCounter = (counter, target) => {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const step = Math.floor(duration / 100);
    
    const timer = setInterval(() => {
      current += increment;
      counter.textContent = Math.floor(current).toLocaleString();
      
      if (current >= target) {
        counter.textContent = target.toLocaleString();
        clearInterval(timer);
      }
    }, step);
  };
  
  // Intersection Observer to trigger counter animation when in viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count);
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5
  });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}
