/* MadaAgri — JS vanilla : navbar sticky, menu mobile, animations, scroll-top */

document.addEventListener("DOMContentLoaded", () => {
  // Navbar : ombre au scroll
  const navbar = document.querySelector(".navbar");
  const onScroll = () => {
    if (window.scrollY > 20) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menu mobile
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("open")) {
          navLinks.classList.remove("open");
          toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Animation d'apparition des cartes
  const cards = document.querySelectorAll(".card");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
    io.observe(card);
  });

  // Bouton "Retour en haut"
  const topBtn = document.querySelector(".scroll-top");
  if (topBtn) {
    const toggleTop = () => {
      if (window.scrollY > 400) topBtn.classList.add("show");
      else topBtn.classList.remove("show");
    };
    window.addEventListener("scroll", toggleTop, { passive: true });
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    toggleTop();
  }

  // Année dynamique footer
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
