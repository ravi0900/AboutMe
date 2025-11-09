let scrollPosition = 0;
// ===== THEME CONFIGURATION =====
// Change this value to switch themes.
// 0 = Original (Bold)
// 1 = Light Blue (Default)
// 2 = Cosmic Lilac (Dark)
// 3 = Oceanic Mint (New)
// 4 = Nature's Whisper (New)
// 4.1 = Nature's Whisper (Enhanced)
// 5 = RGB Modern
// 5.1 = RGB Glitch
// 5.2 = Digital Bloom
const THEME = 5.2;

const THEME_COLORS = {
  0: '#0044FF',        // Original Bold
  1: '#0052D4',        // Light Blue (Default)
  2: '#2c3e50',        // Cosmic Lilac (Dark)
  3: '#1dd1a1',        // Oceanic Mint
  4: '#2E8B57',        // Nature's Whisper
  4.1: '#2E8B57',      // Nature's Whisper (Enhanced)
  5: '#1a1a1a',        // RGB Modern
  5.1: '#0d0d0d',      // RGB Glitch
  5.2: '#0B1A24',      // Digital Bloom
};

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

document.addEventListener('DOMContentLoaded', function() {
  // Apply the selected theme
  if (typeof THEME === 'number') {
    document.documentElement.setAttribute('data-theme', THEME);
    
    // Update theme-color meta tag for mobile browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta && THEME_COLORS[THEME]) {
      themeColorMeta.setAttribute('content', THEME_COLORS[THEME]);
    }

    if (THEME === 4) {
      createFloatingLeaves();
    } else if (THEME === 4.1) {
      createEnhancedFloatingLeaves();
    } else if (THEME === 5.2) {
      createDigitalBloomEffects();
    }
  }

  // Mobile menu elements
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  const navBar = document.querySelector(".nav");
  const navHeight = navBar.getBoundingClientRect().height;
  const bodyOverlay = document.querySelector('.body-overlay');
  
  // Modal elements
  const resumeModal = document.getElementById('resume-modal');
  const viewResumeBtn = document.getElementById('view-resume-btn');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  
  // Add loaded class for fade-in animations
  const hero = document.querySelector('.hero');
  const ctaButtons = document.querySelector('.cta-buttons');
  const icons = document.querySelector('.icons');
  
  // Trigger animations after a short delay
  setTimeout(() => {
    if (hero) hero.classList.add('loaded');
    if (ctaButtons) ctaButtons.classList.add('loaded');
    if (icons) icons.classList.add('loaded');
  }, 300);

  function updateScrollLock() {
    const isModalOpen = resumeModal && resumeModal.classList.contains('active');
    const isMenuOpen = navLinks && navLinks.classList.contains('active');

    if (isModalOpen || isMenuOpen) {
      if (!document.body.classList.contains('scroll-lock')) {
        scrollPosition = window.pageYOffset;
        document.body.style.top = `-${scrollPosition}px`;
        document.body.classList.add('scroll-lock');
      }
    } else {
      if (document.body.classList.contains('scroll-lock')) {
        document.body.classList.remove('scroll-lock');
        document.body.style.removeProperty('top');
        window.scrollTo(0, scrollPosition);
      }
    }
  }

  // Toggle mobile menu
  function toggleMenu() {
    const isOpen = !navLinks.classList.contains('active');
    navToggle.classList.toggle('active', isOpen);
    navLinks.classList.toggle('active', isOpen);
    if (bodyOverlay) bodyOverlay.classList.toggle('active', isOpen);
    updateScrollLock();
    navToggle.setAttribute('aria-expanded', isOpen);
  }

  // Open modal
  function openModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      updateScrollLock();
    }
  }

  // Close modal
  function closeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      updateScrollLock();
    }
  }

  // Close menu when clicking outside
  function closeMenuOnOutsideClick(e) {
    if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
      toggleMenu();
    }
  }

  // Smooth scroll to section
  function smoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        toggleMenu();
      }
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Event listeners
  if (navToggle) {
    navToggle.addEventListener("click", function(e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Modal event listeners
  if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', openModal);
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', function(e) {
      if (e.target === resumeModal) {
        closeModal();
      }
    });
  }

  // Add smooth scroll to nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener("click", smoothScroll);
  });

  // Close menu when clicking outside
  document.addEventListener('click', closeMenuOnOutsideClick);

  // Close modal with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle window resize and scroll
  function handleResize() {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      toggleMenu();
    }
  }

  function handleScroll() {
    const scrollHeight = window.pageYOffset;
    if (scrollHeight > navHeight) {
      navBar.classList.add("fixed-nav");
    } else {
      navBar.classList.remove("fixed-nav");
    }
  }

  // Add event listeners
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleScroll);

  // Initial check
  handleScroll();
});

// Function to create floating leaves for Theme 4
function createFloatingLeaves() {
  const header = document.querySelector('.header');
  if (!header) return;

  const container = document.createElement('div');
  container.className = 'leaves-container';
  header.prepend(container);

  const leafCount = 15;
  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    // Randomize properties for a natural effect
    leaf.style.left = `${Math.random() * 100}vw`;
    leaf.style.animationDuration = `${Math.random() * 8 + 7}s`; // 7 to 15 seconds
    leaf.style.animationDelay = `${Math.random() * 10}s`;
    const size = `${Math.random() * 15 + 10}px`; // 10px to 25px
    leaf.style.width = size;
    leaf.style.height = size;
    // Custom property for random rotation in CSS
    leaf.style.setProperty('--rotation-start', `${Math.random() * 360 - 180}deg`);
    leaf.style.setProperty('--rotation-end', `${Math.random() * 360 - 180}deg`);

    container.appendChild(leaf);
  }
}

// Function to create floating leaves for Theme 4.1
function createEnhancedFloatingLeaves() {
  const header = document.querySelector('.header');
  if (!header) return;

  const container = document.createElement('div');
  container.className = 'leaves-container';
  header.prepend(container);

  const leafCount = 20; // Increased leaf count for a fuller effect
  const leafColors = [
    'rgba(46, 139, 87, 0.7)',   // SeaGreen
    'rgba(85, 107, 47, 0.7)',   // DarkOliveGreen
    'rgba(218, 165, 32, 0.7)', // Goldenrod
    'rgba(139, 69, 19, 0.6)'    // SaddleBrown
  ];

  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    
    // Randomize properties for a natural effect
    leaf.style.left = `${Math.random() * 100}vw`;
    leaf.style.animationDuration = `${Math.random() * 8 + 7}s`; // 7 to 15 seconds
    leaf.style.animationDelay = `${Math.random() * 10}s`;
    
    const size = `${Math.random() * 15 + 10}px`; // 10px to 25px
    leaf.style.width = size;
    leaf.style.height = size;
    
    // Set random color
    leaf.style.backgroundColor = leafColors[Math.floor(Math.random() * leafColors.length)];

    // Custom properties for random rotation and drift in CSS
    leaf.style.setProperty('--rotation-start', `${Math.random() * 360 - 180}deg`);
    leaf.style.setProperty('--rotation-end', `${Math.random() * 360 - 180}deg`);
    leaf.style.setProperty('--horizontal-drift', `${Math.random() * 40 - 20}vw`);

    container.appendChild(leaf);
  }
}

// Function to create digital bloom effects for Theme 5.2
function createDigitalBloomEffects() {
  const header = document.querySelector('.header');
  if (!header) return;

  const container = document.createElement('div');
  container.className = 'particles-container';
  header.prepend(container);

  const particleCount = 30;
  const colors = ['#00ffff', '#39ff14', '#f8f8ff'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1; // size between 1px and 5px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}%`;
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 ${Math.random() * 8 + 4}px ${color}`;
    
    particle.style.animationDuration = `${Math.random() * 20 + 15}s`; // 15 to 35 seconds
    particle.style.animationDelay = `-${Math.random() * 25}s`; // Start animations at different points

    container.appendChild(particle);
  }
}
