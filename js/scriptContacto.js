const cursorDot = document.getElementById("cursorDot");
const cursorTrail = document.getElementById("cursorTrail");

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  if (cursorDot) {
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  }
});


function animateTrail() {
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;
  
  if (cursorTrail) {
    cursorTrail.style.left = trailX + "px";
    cursorTrail.style.top = trailY + "px";
  }
  
  requestAnimationFrame(animateTrail);
}
animateTrail();

const canvas = document.getElementById('canvas-bg');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  const particles = [];
  const particleCount = 80;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = '#4cafef';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', resizeCanvas);
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

const sendBtn = document.getElementById('sendBtn');
const sendProgress = document.querySelector('.send-progress');
const sentToast = document.getElementById('sentToast');
const errorToast = document.getElementById('errorToast');
const successToast = document.getElementById('successToast');
const contactForm = document.getElementById('contactForm');

let isHolding = false;
let holdTimer;
let progressTimer;

function showToast(toastElement, duration = 3000) {
  if (toastElement) {
    toastElement.classList.add('show');
    setTimeout(() => {
      toastElement.classList.remove('show');
    }, duration);
  }
}

function hideAllToasts() {
  [sentToast, errorToast, successToast].forEach(toast => {
    if (toast) toast.classList.remove('show');
  });
}

if (sendBtn) {
  sendBtn.addEventListener('mousedown', startHold);
  sendBtn.addEventListener('mouseup', endHold);
  sendBtn.addEventListener('mouseleave', endHold);
  sendBtn.addEventListener('touchstart', startHold);
  sendBtn.addEventListener('touchend', endHold);
}

function startHold() {
  if (isHolding) return;
  
  isHolding = true;
  let progress = 0;
  const duration = 900;
  const interval = 10;
  const step = (interval / duration) * 100;

  if (sendProgress) {
    sendProgress.style.transition = 'none';
    
    progressTimer = setInterval(() => {
      progress += step;
      sendProgress.style.width = Math.min(progress, 100) + '%';
      
      if (progress >= 100) {
        clearInterval(progressTimer);
        sendMessage();
      }
    }, interval);
  }
}

function endHold() {
  if (!isHolding) return;
  
  isHolding = false;
  clearInterval(progressTimer);
  
  if (sendProgress) {
    sendProgress.style.transition = 'width 0.3s ease';
    sendProgress.style.width = '0%';
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sendMessage() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const message = messageInput ? messageInput.value.trim() : '';

  hideAllToasts();

  if (!name || !email || !message) {
    showToast(errorToast, 4000);
    endHold();
    return;
  }

  if (!validateEmail(email)) {
    if (errorToast) {
      const originalText = errorToast.innerHTML;
      errorToast.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i> Ingresa un email válido';
      showToast(errorToast, 4000);
      
      setTimeout(() => {
        errorToast.innerHTML = originalText;
      }, 4000);
    }
    endHold();
    return;
  }

  if (sendBtn) {
    sendBtn.classList.add('success');
    const sendLabel = sendBtn.querySelector('.send-label');
    if (sendLabel) {
      sendLabel.textContent = '¡Enviado!';
    }
  }
  
  showToast(successToast, 4000);
  
  if (sentToast) {
    setTimeout(() => {
      sentToast.classList.add('show');
    }, 500);
  }
  
  setTimeout(() => {
    if (sendBtn) {
      sendBtn.classList.remove('success');
      const sendLabel = sendBtn.querySelector('.send-label');
      if (sendLabel) {
        sendLabel.textContent = 'Mantener para enviar';
      }
    }
    
    if (sentToast) {
      sentToast.classList.remove('show');
    }
    
    if (contactForm) {
      contactForm.reset();
    }
  }, 4000);
  
  endHold();
}

const inputs = document.querySelectorAll('.input-ghost');
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.style.transform = 'translateY(-3px)';
  });
  
  input.addEventListener('blur', () => {
    input.style.transform = 'translateY(0)';
  });
});

const bubbles = document.querySelectorAll('.bubble');
bubbles.forEach(bubble => {
  bubble.addEventListener('mouseenter', () => {
    bubble.style.transform = 'translateY(-8px) scale(1.08) rotate(-6deg)';
  });
  
  bubble.addEventListener('mouseleave', () => {
    bubble.style.transform = 'translateY(0) scale(1) rotate(0deg)';
  });
});

[errorToast, successToast].forEach(toast => {
  if (toast) {
    toast.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }
});

const messageTextarea = document.getElementById('message');
if (messageTextarea) {
  messageTextarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 200) + 'px';
  });
}

function typewriterEffect(element, text, speed = 100) {
  if (!element) return;
  
  let i = 0;
  element.placeholder = '';
  
  function typeChar() {
    if (i < text.length) {
      element.placeholder += text.charAt(i);
      i++;
      setTimeout(typeChar, speed);
    }
  }
  
  typeChar();
}

console.log('🎨 Página de contacto cargada - Jimmy Portfolio');