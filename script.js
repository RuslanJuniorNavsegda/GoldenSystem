class GoldenSystem {
  constructor() {
    this.init();
    this.addEventListeners();
  }

  init() {
    this.initBurgerMenu();
    this.initSmoothScroll();
    this.initScrollAnimations();
    this.initPortfolioFilter();
    this.initFormHandler();
    this.initHeaderEffects();
  }

  // Инициализация элементов
  initBurgerMenu() {
    this.burger = document.querySelector(".burger");
    this.navLinks = document.querySelector(".nav-links");
    this.body = document.body;
  }

  // Плавный скролл
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) =>
        this.handleSmoothScroll(e, anchor)
      );
    });
  }

  // Анимации при скролле
  initScrollAnimations() {
    this.observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            this.handlePortfolioHover(entry.target); // Новая функция для портфолио
          }
        }),
      { threshold: 0.1 }
    );

    document.querySelectorAll(".scroll-effect").forEach((el) => {
      this.observer.observe(el);
    });
  }

  // Фильтрация портфолио
  initPortfolioFilter() {
    this.filterButtons = document.querySelectorAll(".filter-btn");
    this.portfolioItems = document.querySelectorAll(".portfolio-item");

    this.filterButtons.forEach((button) => {
      button.addEventListener("click", () => this.handleFilterClick(button));
    });
  }

  // Обработка формы
  initFormHandler() {
    this.form = document.querySelector(".contact-form");
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }
  }

  // Эффекты для хедера
  initHeaderEffects() {
    this.header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
      this.header.classList.toggle("scrolled", window.scrollY > 100);
    });
  }

  // Общие обработчики событий
  addEventListeners() {
    document.addEventListener("click", (e) => this.handleDocumentClick(e));
    document.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("resize", () => this.handleResize());
  }

  // Обработчики событий
  handleSmoothScroll(e, anchor) {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      this.closeMenu();
    }
  }

  handleFilterClick(button) {
    this.filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.textContent.toLowerCase();

    this.portfolioItems.forEach((item) => {
      item.style.display =
        filter === "все" || item.dataset.category.includes(filter)
          ? "grid"
          : "none";
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.showFormMessage("Сообщение успешно отправлено!", "success");
    this.form.reset();
  }

  handleDocumentClick(e) {
    if (!this.burger.contains(e.target) && !this.navLinks.contains(e.target)) {
      this.closeMenu();
    }
  }

  handleKeyDown(e) {
    if (e.key === "Escape") this.closeMenu();
  }

  handleResize() {
    if (window.innerWidth > 768) {
      this.closeMenu();
    }
  }

  handlePortfolioHover(element) {
    if (element.classList.contains("portfolio-item")) {
      element.addEventListener("mouseenter", () => {
        element.querySelector(".portfolio-overlay").style.opacity = "1";
      });
      element.addEventListener("mouseleave", () => {
        element.querySelector(".portfolio-overlay").style.opacity = "0";
      });
    }
  }

  // Управление меню
  toggleMenu() {
    this.burger.classList.toggle("active");
    this.navLinks.classList.toggle("active");
    this.body.classList.toggle("lock");
  }

  closeMenu() {
    this.burger.classList.remove("active");
    this.navLinks.classList.remove("active");
    this.body.classList.remove("lock");
  }

  // Вспомогательные методы
  showFormMessage(text, type) {
    const existingMessage = this.form.querySelector(".form-message");
    if (existingMessage) existingMessage.remove();

    const message = document.createElement("div");
    message.className = `form-message ${type}`;
    message.textContent = text;

    this.form.prepend(message);
    setTimeout(() => message.remove(), 3000);
  }
}

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", () => {
  new GoldenSystem();
});

// Полифил для Safari
if (!("scrollBehavior" in document.documentElement.style)) {
  import("smoothscroll-polyfill").then(({ polyfill }) => polyfill());
}
