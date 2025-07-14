// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

document.addEventListener('DOMContentLoaded', function() {
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