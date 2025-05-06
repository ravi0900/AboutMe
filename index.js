AOS.init();

const menu = document.querySelector(".menu");
const navOpen = document.querySelector(".hamburger");
const navClose = document.querySelector(".close");

navOpen.addEventListener("click", () => {
  menu.classList.add("show");
  document.body.classList.add("show");
});

navClose.addEventListener("click", () => {
  menu.classList.remove("show");
  document.body.classList.remove("show");
});

// Fixed Nav
const navBar = document.querySelector(".nav");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) navBar.classList.add("fix-nav");
  else navBar.classList.remove("fix-nav");
});

// Color Control
const widget = document.querySelector('.widget');
const colors = document.querySelectorAll('.colors span');

widget.addEventListener('click', () => {
  document.querySelector('.colors').classList.toggle('open');
});

colors.forEach(color => {
  color.addEventListener('click', () => {
    const currentColor = color.dataset.id;
    document.documentElement.style.setProperty('--customColor', currentColor);
  });
});

window.addEventListener('scroll', () => {
  document.querySelector('.colors').classList.remove('open');
});

// Scroll To
const links = document.querySelectorAll(".scroll-link");
links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const position = element.offsetTop - navHeight;
    window.scrollTo({ top: position, left: 0 });
    menu.classList.remove("show");
    document.body.classList.remove("show");
  });
});

// TypeIt Animation
new TypeIt("#type1, #type2", {
  speed: 120,
  loop: true,
  waitUntilVisible: true,
})
  .type("Life Long Learner", { delay: 400 })
  .pause(500)
  .delete(17)
  .type("Developer", { delay: 400 })
  .pause(500)
  .delete(9)
  .go();

// GSAP Animations
gsap.from(".logo", { opacity: 0, duration: 1, delay: 0.5, y: -10 });
gsap.from(".hamburger", { opacity: 0, duration: 1, delay: 1, x: 20 });
gsap.from(".banner", { opacity: 0, duration: 1, delay: 1.5, x: -200 });
gsap.from(".hero h3", { opacity: 0, duration: 1, delay: 2, y: -50 });
gsap.from(".hero h1", { opacity: 0, duration: 1, delay: 2.5, y: -45 });
gsap.from(".hero h4", { opacity: 0, duration: 1, delay: 3, y: -30 });
gsap.from(".hero a", { opacity: 0, duration: 1, delay: 3.5, y: 50 });
gsap.from(".nav-item", { opacity: 0, duration: 1, delay: 1.2, y: 30, stagger: 0.2 });
gsap.from(".icons span", { opacity: 0, duration: 1, delay: 4, x: -30, stagger: 0.2 });