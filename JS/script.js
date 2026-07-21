// Animation Observer Setup - combines Timeline & Section observers
const createObserver = (selector, threshold) => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("show"));
  }, { threshold });
  document.querySelectorAll(selector).forEach(el => observer.observe(el));
};

createObserver(".timeline-item", 0.25);
const sections = document.querySelectorAll("section");
sections.forEach(s => s.classList.add("hidden"));
createObserver("section", 0.15);

// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById("progress-bar").style.width = (window.pageYOffset / total * 100) + "%";
});

// Active Navigation Link
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (pageYOffset >= section.offsetTop - 160) current = section.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

// Back to Top
const topBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 500 ? "block" : "none";
});
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// Mouse Glow Effect
document.addEventListener("mousemove", e => {
  const glow = document.getElementById("mouse-glow");
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Typing Animation
const words = ["Computer Science Student", "Learning Web Development", "Building Python Projects", "Future Software Engineer"];
let wordIndex = 0, charIndex = 0, deleting = false;

const typeAnimation = () => {
  const current = words[wordIndex];
  const typing = document.getElementById("typing");
  if (!deleting) {
    typing.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(typeAnimation, 1500);
      return;
    }
  } else {
    typing.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeAnimation, deleting ? 45 : 90);
};
typeAnimation();

// Hero Button Tilt Effect
const heroBtn = document.querySelector(".hero-btn");
heroBtn.addEventListener("mousemove", e => {
  const rect = heroBtn.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / 12;
  const y = (e.clientY - rect.top - rect.height / 2) / 12;
  heroBtn.style.transform = `translate(${x}px, ${y}px)`;
});
heroBtn.addEventListener("mouseleave", () => heroBtn.style.transform = "translate(0,0)");

// Lightbox Modal
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox?.querySelector(".lightbox-image");
const closeBtn = lightbox?.querySelector(".lightbox-close");

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
};

const openLightbox = (src, alt) => {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
};

document.querySelectorAll(".lightbox-trigger").forEach(trigger => {
  trigger.addEventListener("click", () => openLightbox(trigger.dataset.src || "", trigger.dataset.alt || ""));
});

closeBtn?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", e => e.target === lightbox && closeLightbox());
document.addEventListener("keydown", e => e.key === "Escape" && closeLightbox());
