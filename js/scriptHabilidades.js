const cursorDot = document.getElementById("cursorDot");
const cursorTrail = document.getElementById("cursorTrail");

let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let trailX = mouseX, trailY = mouseY;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  }
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  if (cursorTrail) {
    cursorTrail.style.left = trailX + "px";
    cursorTrail.style.top = trailY + "px";
  }
  requestAnimationFrame(animateTrail);
}
animateTrail();

const hoverEls = ['a', 'button', '.card', '.progress-bar'];
document.addEventListener('mouseover', (e) => {
  if (e.target.closest(hoverEls.join(','))) {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1.8)';
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.1)';
  }
});
document.addEventListener('mouseout', (e) => {
  if (!e.target.closest(hoverEls.join(','))) {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
  }
});

const canvas = document.getElementById('canvas-bg');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  function rand(a,b){ return Math.random()*(b-a)+a; }

  class Dot {
    constructor(){ this.reset(); }
    reset(){ this.x = rand(0,w); this.y = rand(0,h); this.r = rand(0.35,1.8); this.vx = rand(-0.25,0.25); this.vy = rand(-0.12,0.12); this.a = rand(0.03,0.18); }
    step(){ this.x += this.vx; this.y += this.vy; if(this.x<-10||this.x>w+10||this.y<-10||this.y>h+10) this.reset(); }
    draw(color){ ctx.beginPath(); ctx.fillStyle=color; ctx.globalAlpha=this.a; ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1; }
  }

  let dots = [];
  function initParticles(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; dots=[]; const count = Math.max(28, Math.floor((w*h)/160000)); for(let i=0;i<count;i++) dots.push(new Dot()); }
  function getPrimary(){ return getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim()||'#4cafef'; }
  function loopParticles(){ ctx.clearRect(0,0,w,h); const color=getPrimary(); for(const d of dots){ d.step(); d.draw(color); } requestAnimationFrame(loopParticles); }
  window.addEventListener('resize', initParticles);
  initParticles();
  loopParticles();
}

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");

    if (menuToggle.classList.contains("fa-bars")) {
      menuToggle.classList.remove("fa-bars");
      menuToggle.classList.add("fa-times");
    } else {
      menuToggle.classList.remove("fa-times");
      menuToggle.classList.add("fa-bars");
    }
  });

  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuToggle.classList.remove("fa-times");
      menuToggle.classList.add("fa-bars");
    });
  });
}

function animateProgressBars() {
  document.querySelectorAll(".progress-bar").forEach(bar => {
    const value = parseInt(bar.getAttribute("data-value")) || 0;
    const rect = bar.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight - 50 && !bar.classList.contains("filled")) {
      bar.classList.add("filled");
      bar.style.width = value + "%";

      let counter = 0;
      const interval = setInterval(() => {
        if (counter >= value) {
          clearInterval(interval);
        } else {
          counter++;
          bar.textContent = counter + "%";
        }
      }, Math.max(8, Math.floor(1500 / Math.max(value,1))));
    }
  });
}
window.addEventListener("scroll", animateProgressBars);
window.addEventListener("load", animateProgressBars);