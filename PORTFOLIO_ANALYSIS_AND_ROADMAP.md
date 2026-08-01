# Portfolio Audit & Roadmap

> **Project**: Marianissi Brenda Portfolio (`marianissi-portfolio`)

---

## 1. Architecture Overview

- **HTML (`index.html`)**: SPA layout with header (`.brand`, `nav`), hero (`#home`), about (`#about`), skills (`#skills`), projects (`#projects`), journey (`#journey`), resume (`#resume`), contact (`#contact`), and lightbox modal (`#lightbox`).
- **CSS (`style/`)**: `style.css` (variables, card components), `animation.css` (`@keyframes`), `responsive.css` (media query breakpoints).
- **JavaScript (`js/script.js`)**: Section scroll reveals (`IntersectionObserver`), scroll progress, header `.scrolled` state, mouse glow tracking, hero button tilt, and lightbox triggers.

---

## 2. Key Audit Findings

### 🔴 Critical Layout & Functional Bugs
1. **Header Oversizing**: Logo is `140px` tall ([`style.css:L103`](file:///d:/Nissi/PTU/Projects/marianissi-portfolio/style/style.css#L103)), covering >20% of viewport. Reduce logo to `44px` and set header height to `70px`.
2. **Nav CSS Selector Bug**: `responsive.css` targets `nav ul`, but `index.html` has direct `<a>` tags without a `<ul>`. Responsive menu styling fails.
3. **Headline Size Bug**: `@media (max-width: 1200px)` increases headline font size to `70px` (base: `52px`). Headlines enlarge on small screens.
4. **Hero Height Bug**: `#home` has `min-height: 150vh;` ([`style.css:L126`](file:///d:/Nissi/PTU/Projects/marianissi-portfolio/style/style.css#L126)), forcing 50% blank scrolling space. Change to `100vh`.
5. **No Mobile Menu**: On screens `<768px`, `nav` displays as a vertical column inside a fixed header, blocking half the mobile viewport.

### 🟡 Design & UX Improvements
- **Font Clash**: Cursive `Dancing Script` brand logo clashes with geometric `Space Grotesk` headers and `Inter` body text.
- **Unused Assets**: `Sacramento` font imported in `style.css` but never used. 70KB FontAwesome imported for only 5 icons.

### ⚡ Performance, Accessibility (WCAG 2.1 AA) & SEO
- **Reflow Thrashing**: `#mouse-glow` updates `top`/`left` on `mousemove`. Use `transform: translate3d()` for GPU acceleration.
- **Contrast & ARIA**: Gold text on dark tag pills has low contrast (~4.1:1). Lightbox modal lacks keyboard focus lock.
- **SEO Gaps**: Missing Open Graph tags, Twitter cards, meta description, and JSON-LD schema.

---

## 3. Prioritized Improvement Roadmap

### Phase 1: Quick Fixes (Beginner)
- [ ] Shrink header logo to `44px` & set header height to `70px`.
- [ ] Wrap `nav` links in `<ul class="nav-list"><li><a href="...">...</a></li></ul>`.
- [ ] Fix headline font inversion bug at 1200px breakpoint using `clamp()`.
- [ ] Set hero section `min-height: 100vh`.
- [ ] Add basic SEO `<meta name="description">` & remove unused `Sacramento` font.

### Phase 2: UI/UX & Responsive Overhaul (Intermediate)
- [ ] Add mobile hamburger navigation menu with backdrop blur.
- [ ] Upgrade cards with glassmorphism (`rgba(20,25,36,0.75)`) & gold border glow.
- [ ] Add project category filters & live demo links.
- [ ] Convert skill lists into visual tech badges with icons.

### Phase 3: JS Performance & Accessibility (Advanced)
- [ ] Hardware-accelerate mouse glow with `transform: translate3d()` via `requestAnimationFrame`.
- [ ] Add visible `:focus-visible` focus rings & WCAG AA contrast colors (`#E5C158`).
- [ ] Implement modal focus trap & body scroll locking.
- [ ] Replace FontAwesome CSS with inline SVG icons.

### Phase 4: Tooling & SEO Mastery (Pro Level)
- [ ] Migrate to Vite (`npx -y create-vite@latest`) for fast bundling & minification.
- [ ] Add JSON-LD `Person` & `WebSite` schema markup.
- [ ] Add `manifest.json` for PWA offline capability.

---

## 4. Key Implementation Examples

### Compact Header Markup & CSS
```html
<header class="site-header">
  <div class="header-container">
    <a href="#home" class="brand">
      <img src="assets/icons/logo.png" alt="" width="40" height="40">
      <span>Marianissi Brenda</span>
    </a>
    <button class="nav-toggle" aria-label="Toggle menu"><span class="hamburger"></span></button>
    <nav class="nav-menu">
      <ul class="nav-list">
        <li><a href="#home">Home</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>
```

```css
.site-header {
  position: fixed; top: 0; left: 0; width: 100%; height: 70px;
  background: rgba(11, 14, 20, 0.85); backdrop-filter: blur(12px);
  z-index: 1000; display: flex; align-items: center;
}
.header-container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; justify-content: space-between; align-items: center; }
.nav-list { display: flex; gap: 32px; list-style: none; }
```

### Hardware-Accelerated Mouse Glow Script
```javascript
let targetX = 0, targetY = 0, currentX = 0, currentY = 0, isAnimating = false;
document.addEventListener("mousemove", (e) => {
  targetX = e.clientX; targetY = e.clientY;
  if (!isAnimating) { isAnimating = true; requestAnimationFrame(renderGlow); }
});
function renderGlow() {
  currentX += (targetX - currentX) * 0.15;
  currentY += (targetY - currentY) * 0.15;
  glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
  if (Math.abs(targetX - currentX) > 0.1) requestAnimationFrame(renderGlow);
  else isAnimating = false;
}
```
