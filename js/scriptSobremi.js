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

(() => {
  const canvas = document.getElementById('canvas-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  function rand(a, b) { return Math.random() * (b - a) + a; }
  class Dot {
    constructor() { this.reset(); }
    reset() { this.x = rand(0, w); this.y = rand(0, h); this.r = rand(0.35, 1.8); this.vx = rand(-0.25, 0.25); this.vy = rand(-0.12, 0.12); this.a = rand(0.03, 0.18); }
    step() { this.x += this.vx; this.y += this.vy; if (this.x < -10 || this.x > w + 10 || this.y < -10 || this.y > h + 10) this.reset(); }
    draw(color) { ctx.beginPath(); ctx.fillStyle = color; ctx.globalAlpha = this.a; ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; }
  }

  let dots = [];
  function init() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; dots = []; const count = Math.max(28, Math.floor((w * h) / 160000)); for (let i = 0; i < count; i++) dots.push(new Dot()); }
  function getPrimary() { return getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#4cafef'; }
  function loop() { ctx.clearRect(0, 0, w, h); const color = getPrimary(); for (const d of dots) { d.step(); d.draw(color); } requestAnimationFrame(loop); }
  window.addEventListener('resize', init);
  init();
  loop();
})();

(() => {
  const dot = document.getElementById('cursorNeb'), trail = document.getElementById('cursorNebTrail');
  if (!dot || !trail) return;
  let mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  let pos = { x: mouse.x, y: mouse.y };
  document.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; dot.style.left = mouse.x + 'px'; dot.style.top = mouse.y + 'px'; });
  function lerp(a, b, n) { return (1 - n) * a + n * b; }
  function raf() { pos.x = lerp(pos.x, mouse.x, 0.12); pos.y = lerp(pos.y, mouse.y, 0.12); trail.style.left = pos.x + 'px'; trail.style.top = pos.y + 'px'; requestAnimationFrame(raf); }
  raf();
  const hoverEls = document.querySelectorAll('a, button, .bubble, .holo-photo');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => { dot.style.transform = 'translate(-50%,-50%) scale(1.9)'; trail.style.transform = 'translate(-50%,-50%) scale(1.08)'; });
    el.addEventListener('mouseleave', () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; trail.style.transform = 'translate(-50%,-50%) scale(1)'; });
  });
})();

(() => {
  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach((b, idx) => {
    const delay = parseInt(b.getAttribute('data-delay') || (idx * 100));
    setTimeout(() => b.classList.add('show'), delay + 180);
  });
})();

(() => {
  const wrap = document.querySelector('.holo-wrap'), photo = document.querySelector('.holo-photo');
  if (!wrap || !photo) return;
  wrap.addEventListener('mousemove', (e) => {
    const r = wrap.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const rx = (dy / r.height) * -6;
    const ry = (dx / r.width) * 6;
    photo.style.transform = `translateZ(30px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  wrap.addEventListener('mouseleave', () => { photo.style.transform = 'translateZ(30px) rotateX(0deg) rotateY(0deg)'; });
})();

(() => {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('show'); } });
  }, { root: null, threshold: 0.12 });
  items.forEach(it => obs.observe(it));
})();