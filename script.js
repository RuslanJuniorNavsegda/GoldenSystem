class GoldenSystem {
  constructor() {
    this.init();
  }

  init() {
    this.initBurgerMenu();
    this.initSmoothScroll();
    this.initAnimations();
    this.initFormValidation();
    this.initSlider();
    this.initScrollEffects();
    this.addEventListeners();
  }

  // Инициализация бургер-меню
  initBurgerMenu() {
    this.burger = document.querySelector(".burger");
    this.navList = document.querySelector(".nav__list");
    this.body = document.body;

    this.burger.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleMenu();
    });

    // Закрытие при клике вне меню
    document.addEventListener("click", (e) => {
      if (!this.burger.contains(e.target) && !this.navList.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Закрытие по ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeMenu();
    });
  }

  toggleMenu() {
    this.burger.classList.toggle("active");
    this.navList.classList.toggle("active");
    this.body.classList.toggle("lock");
  }

  closeMenu() {
    this.burger.classList.remove("active");
    this.navList.classList.remove("active");
    this.body.classList.remove("lock");
  }

  // Плавная прокрутка
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Закрытие меню на мобильных
          if (window.innerWidth < 768) {
            this.closeMenu();
          }
        }
      });
    });
  }

  // Анимации при скролле
  initAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    document.querySelectorAll(".animate").forEach((el) => {
      observer.observe(el);
    });
  }

  // Слайдер отзывов
  initSlider() {
    const slider = document.querySelector(".reviews-slider");
    if (!slider) return;

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    slider.addEventListener("mousedown", this.sliderStart);
    slider.addEventListener("touchstart", this.sliderStart);
    slider.addEventListener("mouseup", this.sliderEnd);
    slider.addEventListener("touchend", this.sliderEnd);
    slider.addEventListener("mousemove", this.sliderMove);
    slider.addEventListener("touchmove", this.sliderMove);
  }

  sliderStart(e) {
    isDragging = true;
    startPos = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    prevTranslate = currentTranslate;
  }

  sliderEnd() {
    isDragging = false;
  }

  sliderMove(e) {
    if (!isDragging) return;
    const currentPosition = e.type.includes("touch")
      ? e.touches[0].clientX
      : e.clientX;
    const diff = currentPosition - startPos;
    currentTranslate = prevTranslate + diff;
    this.style.transform = `translateX(${currentTranslate}px)`;
  }

  // Обработка форм
  initFormValidation() {
    document.querySelectorAll("form").forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');

        try {
          submitBtn.disabled = true;

          // Заглушка для демонстрации
          await new Promise((resolve) => setTimeout(resolve, 1000));

          this.showFormMessage(
            form,
            "Сообщение успешно отправлено!",
            "success"
          );
          form.reset();
        } catch (error) {
          this.showFormMessage(form, "Ошибка отправки!", "error");
        } finally {
          submitBtn.disabled = false;
        }
      });
    });
  }

  showFormMessage(form, text, type) {
    const message = document.createElement("div");
    message.className = `form-message ${type}`;
    message.textContent = text;

    form.parentNode.insertBefore(message, form);
    setTimeout(() => message.remove(), 3000);
  }

  // Эффекты при скролле
  initScrollEffects() {
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
      // Эффект хедера
      window.scrollY > 100
        ? header.classList.add("scrolled")
        : header.classList.remove("scrolled");

      // Параллакс для героя
      const heroImage = document.querySelector(".hero__image img");
      if (heroImage) {
        heroImage.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      }
    });
  }

  // Глобальные обработчики
  addEventListeners() {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) this.closeMenu();
    });
  }
}

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", () => {
  new GoldenSystem();
});
