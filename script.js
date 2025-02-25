class GoldenSystem {
  constructor() {
    this.init();
  }

  init() {
    this.setupBurgerMenu();
    this.setupSmoothScroll();
    this.setupAnimations();
    this.setupSlider();
    this.addEventListeners();
  }

  setupBurgerMenu() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav__list");

    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      nav.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  setupAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate").forEach((el) => observer.observe(el));
  }

  setupSlider() {
    const slider = new Swiper(".reviews-slider", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  addEventListeners() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const header = document.querySelector(".header");
    window.scrollY > 100
      ? header.classList.add("scrolled")
      : header.classList.remove("scrolled");
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  new GoldenSystem();
});
