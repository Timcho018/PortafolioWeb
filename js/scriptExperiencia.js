const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('fa-bars');
  menuToggle.classList.toggle('fa-times');
});
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.classList.remove('fa-times');
    menuToggle.classList.add('fa-bars');
  });
});

const items = document.querySelectorAll('.timeline-item');
function checkTimeline() {
  const triggerBottom = window.innerHeight * 0.85;
  items.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerBottom) {
      item.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', checkTimeline);
checkTimeline();

const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
let particles = [];
for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1,
    size: Math.random() * 3 + 1,
    color: Math.random() > 0.5 ? '#0ff' : '#f0f',
    opacity: Math.random() * 0.5 + 0.2
  });
}
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();