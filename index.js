// ===== THEME CONFIGURATION =====
// Change this value to switch themes.
// 0 = Original (Bold)
// 1 = Light Blue (Default)
// 2 = Cosmic Lilac (Dark)
// 3 = Oceanic Mint (New)
// 4 = Nature's Whisper (New)
const THEME = 4;

const THEME_COLORS = {
  0: '#0044FF',        // Original Bold
  1: '#0052D4',        // Light Blue (Default)
  2: '#2c3e50',        // Cosmic Lilac (Dark)
  3: '#1dd1a1',        // Oceanic Mint
  4: '#2E8B57',        // Nature's Whisper
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
    }
  }

  // Mobile menu elements
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  const navBar = document.querySelector(".nav");
  const navHeight = navBar.getBoundingClientRect().height;
  
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

  // Toggle mobile menu
  function toggleMenu() {
    const isOpen = !navLinks.classList.contains('active');
    navToggle.classList.toggle('active', isOpen);
    navLinks.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    navToggle.setAttribute('aria-expanded', isOpen);
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

  // Add smooth scroll to nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener("click", smoothScroll);
  });

  // Close menu when clicking outside
  document.addEventListener('click', closeMenuOnOutsideClick);

  // Handle window resize and scroll
  function handleResize() {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
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
