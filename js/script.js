const cursor = document.querySelector(".cursor");
const trail = document.querySelector(".cursor-trail");

document.addEventListener("mousemove", (e) => {
  let x = e.clientX + "px";
  let y = e.clientY + "px";

  if (cursor) {
    cursor.style.left = x;
    cursor.style.top = y;
  }
  if (trail) {
    trail.style.left = x;
    trail.style.top = y;
  }
});

const words = ["Tecnología", "Programación", "Ingeniería", "Innovación", "Informática"];
let i = 0;
const span = document.querySelector(".typing-text span");

if (span) {
  setInterval(() => {
    span.textContent = words[i];
    i = (i + 1) % words.length;
  }, 2000);
}

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");

    if (menuToggle.classList.contains("fa-bars")) {
      menuToggle.classList.remove("fa-bars");
      menuToggle.classList.add("fa-times");
    } else if (menuToggle.classList.contains("fa-times")) {
      menuToggle.classList.remove("fa-times");
      menuToggle.classList.add("fa-bars");
    } else {
      menuToggle.classList.toggle("open");
    }
  });

  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      if (menuToggle.classList.contains("fa-times")) {
        menuToggle.classList.remove("fa-times");
        menuToggle.classList.add("fa-bars");
      } else {
        menuToggle.classList.remove("open");
      }
    });
  });
}