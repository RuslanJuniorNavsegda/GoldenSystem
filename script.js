const burger = document.querySelector(".burger-menu");
const header = document.querySelector("header");

burger.addEventListener("click", () => {
  header.classList.toggle("nav-active");
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    header.classList.remove("nav-active");
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.style.background = "rgba(45, 45, 45, 0.98)";
  } else {
    header.style.background = "rgba(45, 45, 45, 0.95)";
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll(".service-card, .portfolio-item").forEach((el) => {
  el.style.opacity = 0;
  el.style.transform = "translateY(30px)";
  observer.observe(el);
});
