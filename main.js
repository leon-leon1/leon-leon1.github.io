// ============ 页脚年份 ============
document.getElementById("year").textContent = new Date().getFullYear();

// ============ 导航栏滚动效果 ============
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  highlightActiveNav();
});

// ============ 移动端菜单 ============
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.classList.toggle("active");
});
// 点击链接后关闭菜单
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
  });
});

// ============ 滚动显现动画 ============
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ============ 技能条动画 ============
const skillBars = document.querySelectorAll(".skill-fill");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.style.getPropertyValue("--w");
        skillObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.4 }
);
skillBars.forEach((bar) => skillObserver.observe(bar));

// ============ 当前区块高亮 ============
const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");
function highlightActiveNav() {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navLinkEls.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}

// ============ 粒子背景动画 ============
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
let w, h;

function resizeCanvas() {
  w = canvas.width = canvas.offsetWidth;
  h = canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const COUNT = Math.min(70, Math.floor(window.innerWidth / 18));
class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.r = Math.random() * 1.8 + 0.6;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(79, 140, 255, 0.7)";
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());
}
initParticles();
window.addEventListener("resize", initParticles);

function connect() {
  const dist = 130;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < dist) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - d / dist) * 0.35})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  connect();
  requestAnimationFrame(animateParticles);
}
animateParticles();
