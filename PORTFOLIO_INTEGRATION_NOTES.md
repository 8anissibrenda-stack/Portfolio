NovaCalc demo integration

What was added

- `assets/calculator/index.js` copied from the original Calculator project.
- NovaCalc preview button now opens `assets/calculator/index.html` inside the site's lightbox iframe (data-type="demo").
- Lightbox now supports HTML demos and PDFs via an embedded iframe; mobile PDFs still open in a new tab.
- Added `Open in new tab` action inside the lightbox for fallback when embedding is blocked.
- Focus trap and ARIA attributes added to the lightbox for accessibility.
- CSS adjustments ensure the iframe is responsive (desktop max width, full-height on small screens).

How to test locally

1. Serve the `marianissi-portfolio` folder (for example use VS Code Live Server or Python http.server):

```bash
# from d:\Nissi\PTU\Projects\marianissi-portfolio
# python 3
python -m http.server 5500
```

2. Open `http://localhost:5500/index.html` in a browser.
3. Scroll to the NovaCalc project card and click `Preview`.
   - On desktop: the calculator demo should open inside the modal; keyboard input should work (numbers/operators, Enter for equals, Backspace, Escape to clear/close).
   - On mobile: tapping `Preview` should open the demo/PDF in the lightbox iframe when supported; PDFs will open in a new tab on devices that trigger download dialogs.
4. Use the `Open in new tab` button if embedding is blocked, and use the close button to close the modal.

Notes & caveats

- The demo is embedded with `sandbox="allow-scripts allow-same-origin"` and `allow` attributes. If you have strict browser settings or extensions that block cross-origin frames, the iframe may be restricted; use the `Open in new tab` link as fallback.

- Accessibility: focus is moved into the modal on open and restored on close; keyboard Tab is trapped within the modal.

Next recommended steps

- Run manual cross-browser testing (Chrome, Edge, Safari mobile).
- Commit changes and push to your remote branch.
- Optionally tweak iframe sandboxing if you need additional capabilities.
