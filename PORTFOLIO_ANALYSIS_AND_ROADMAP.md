# Portfolio Analysis & Roadmap

> **Target Project**: Marianissi Brenda Portfolio (`marianissi-portfolio`)

---

## 1. Architecture Overview
- **Structure**: Vanilla HTML5 single-page site (`index.html`).
- **Styling**: Modular CSS in `style/` (`style.css`, `animation.css`, `responsive.css`).
- **Logic**: Vanilla JS in `js/script.js` (`IntersectionObserver` animations, scroll progress, typewriter effect, mouse glow, lightbox modal).

---

## 2. Key Audit Findings

### 🔴 Critical Layout & Functional Bugs
1. **Header Oversizing**: `.logo` is set to `140px` ([`style.css:L103`](file:///d:/Nissi/PTU/Projects/marianissi-portfolio/style/style.css#L103)), covering >20% of screen height. Reduce to `44px`.
2. **Nav CSS Selector Bug**: `responsive.css` targets `nav ul`, but `index.html` has direct `<a>` tags without a `<ul>`. Responsive styling fails.
3. **Font Inversion Bug**: `@media (max-width: 1200px)` increases headline font size to `70px` (base: `52px`). Headlines enlarge on small screens.
4. **Hero Height Bug**: `#home` has `min-height: 150vh;` ([`style.css:L126`](file:///d:/Nissi/PTU/Projects/marianissi-portfolio/style/style.css#L126)), creating blank scroll space. Change to `100vh`.
5. **No Mobile Hamburger Menu**: Screen widths `<768px` convert `nav` into a column stack that blocks half the mobile viewport.

### 🟡 Design & UX Improvements
- **Typography Clash**: `Dancing Script` brand font clashes with geometric `Space Grotesk` headers and `Inter` body text.
- **Unused Assets**: `Sacramento` font imported in `style.css` but never used. 70KB FontAwesome imported for only 5 icons.

### ⚡ Performance, Accessibility & SEO
- **Reflow Thrashing**: `#mouse-glow` updates `top`/`left` on raw `mousemove`. Use `transform: translate3d()` for 60fps performance.
- **Contrast & ARIA**: Gold text on dark tags has low contrast (~4.1:1). Lightbox modal lacks keyboard focus lock.
- **SEO Gaps**: Missing Open Graph tags, Twitter cards, meta description, and JSON-LD schema.

---

## 3. Prioritized Improvement Roadmap

### Phase 1: Quick Fixes (Beginner)
- [ ] Shrink header logo to `44px` & set header height to `70px`.
- [ ] Wrap `nav` links in `<ul><li>` tags for correct CSS targeting.
- [ ] Fix font inversion bug at 1200px breakpoint.
- [ ] Set hero section `min-height: 100vh`.
- [ ] Add basic SEO `<meta name="description">` & remove unused `Sacramento` font.

### Phase 2: UI/UX & Responsive Overhaul (Intermediate)
- [ ] Add mobile hamburger navigation drawer with backdrop blur.
- [ ] Upgrade cards with glassmorphism (`rgba(22,29,45,0.7)`) & subtle gold glow borders.
- [ ] Add category filter tabs & live demo links to projects.
- [ ] Convert text skill lists into visual tech badges with icons.

### Phase 3: Performance & Accessibility (Advanced)
- [ ] Hardware-accelerate mouse glow with `transform: translate3d()` via `requestAnimationFrame`.
- [ ] Add custom `:focus-visible` focus rings & WCAG AA contrast colors (`#E5C158`).
- [ ] Implement modal focus trap & body scroll locking.
- [ ] Replace FontAwesome CSS with inline SVG icons.

### Phase 4: Tooling & SEO Mastery (Pro Level)
- [ ] Migrate to Vite (`npx -y create-vite@latest`) for fast bundling & minification.
- [ ] Add JSON-LD `Person` & `WebSite` schema markup.
- [ ] Add `manifest.json` for PWA offline capability.
