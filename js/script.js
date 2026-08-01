//Timeline Animation
const timelineItems = document.querySelectorAll(".timeline-item");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.25 },
);

timelineItems.forEach((item) => observer.observe(item));

// Section Fade
const sections = document.querySelectorAll("section");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.15 },
);

sections.forEach((section) => {
  section.classList.add("hidden");
  sectionObserver.observe(section);
});

// Scroll Progress
const progress = document.getElementById("progress-bar");
const topBtn = document.getElementById("backToTop");
const header = document.querySelector("header");
const navLinks = document.querySelectorAll("nav a");

let isTicking = false;

const onScroll = () => {
  const scrollY = window.scrollY || window.pageYOffset;
  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progressHeight = totalHeight ? (scrollY / totalHeight) * 100 : 0;
  progress.style.width = progressHeight + "%";

  topBtn.style.display = scrollY > 500 ? "block" : "none";
  header?.classList.toggle("scrolled", scrollY > 20);

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current,
    );
  });
  isTicking = false;
};

window.addEventListener("scroll", () => {
  if (!isTicking) {
    window.requestAnimationFrame(onScroll);
    isTicking = true;
  }
});

topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Mouse Glow
const glow = document.getElementById("mouse-glow");
const glowState = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  targetX: window.innerWidth / 2,
  targetY: window.innerHeight / 2,
  ticking: false,
};

document.addEventListener("mousemove", (e) => {
  glowState.targetX = e.clientX;
  glowState.targetY = e.clientY;
  if (!glowState.ticking) {
    window.requestAnimationFrame(() => {
      glowState.x += (glowState.targetX - glowState.x) * 0.16;
      glowState.y += (glowState.targetY - glowState.y) * 0.16;
      glow.style.left = glowState.x + "px";
      glow.style.top = glowState.y + "px";
      glowState.ticking = false;
    });
    glowState.ticking = true;
  }
});

// Typing Animation
const words = [
  "Computer Science Student",
  "Learning Web Development",
  "Building Python Projects",
  "Future Software Engineer",
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
const lightboxIframe = lightbox?.querySelector(".lightbox-iframe");
const closeBtn = lightbox?.querySelector(".lightbox-close");
const triggers = document.querySelectorAll(".lightbox-trigger");

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");

  if (lightboxIframe) {
    lightboxIframe.src = "";
    lightboxIframe.style.display = "none";
  }

  if (lightboxImg) {
    lightboxImg.style.display = "none";
  }
};

triggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!lightbox) return;

    const src = trigger.dataset.src || "";
    const alt = trigger.dataset.alt || "";
    const isPdf = src.toLowerCase().endsWith(".pdf");

    if (lightboxImg) {
      lightboxImg.style.display = isPdf ? "none" : "block";
      lightboxImg.src = isPdf ? "" : src;
      lightboxImg.alt = alt;
    }

    if (lightboxIframe) {
      lightboxIframe.style.display = isPdf ? "block" : "none";
      lightboxIframe.src = isPdf ? src : "";
    }

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
