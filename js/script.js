//Timeline Animation
const timelineItems = document.querySelectorAll(".timeline-item");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.25 });

timelineItems.forEach((item) => observer.observe(item));

// Section Fade
const sections = document.querySelectorAll("section");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.15 });

sections.forEach((section) => {
  section.classList.add("hidden");
  sectionObserver.observe(section);
});

// Scroll Progress
const progress = document.getElementById("progress-bar");
window.addEventListener("scroll", () => {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progressHeight = (window.pageYOffset / totalHeight) * 100;
  progress.style.width = progressHeight + "%";
});

// Active Navbar
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;
    if (pageYOffset >= sectionTop) current = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) link.classList.add("active");
  });
});

// Back To Top
const topBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 500 ? "block" : "none";
});
topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

//Mouse Glow
const glow = document.getElementById("mouse-glow");
document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Typing Animation
const words = [
  "Computer Science Student",
  "Learning Web Development",
  "Building Python Projects",
  "Future Software Engineer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typing = document.getElementById("typing");

function type() {
  const current = words[wordIndex];
  if (!deleting) {
    typing.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(type, 1500);
      return;
    }
  } else {
    typing.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 45 : 90);
}
type();

const heroBtn = document.querySelector(".hero-btn");
heroBtn.addEventListener("mousemove", (e) => {
  const rect = heroBtn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  heroBtn.style.transform = `translate(${(x - rect.width / 2) / 12}px, ${(y - rect.height / 2) / 12}px)`;
});
heroBtn.addEventListener("mouseleave", () => {
  heroBtn.style.transform = "translate(0,0)";
});

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox?.querySelector(".lightbox-image");
const closeBtn = lightbox?.querySelector(".lightbox-close");
const triggers = document.querySelectorAll(".lightbox-trigger");

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
};

triggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = trigger.dataset.src || "";
    lightboxImg.alt = trigger.dataset.alt || "";
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  });
});

closeBtn?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
