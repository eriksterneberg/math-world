# Quickstart Guide: Math Planet Learning Site

**Feature**: 001-math-worlds-site  
**Date**: October 25, 2025  
**Purpose**: Get the Math Planet static site running locally in under 5 minutes

## Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge from last 2 years)
- Basic terminal/command line knowledge
- Git (for cloning the repository)
- Optional: Local web server (Python, Node.js, or PHP) for testing localization

## Quick Start (30 seconds)

### Option 1: Direct File Opening

1. Clone the repository:
   ```bash
   git clone https://github.com/eriksterneberg/math-world.git
   cd math-world
   ```

2. Open the home page in your browser:
   ```bash
   # macOS
   open frontend/index.html
   
   # Linux
   xdg-open frontend/index.html
   
   # Windows
   start frontend/index.html
   ```

3. Done! The site should open in your default browser.

**Note**: Direct file opening works for viewing the site, but localization (i18n) requires a local server due to browser CORS restrictions on local file:// protocols.

---

### Option 2: Local Web Server (Recommended)

For full functionality including localization:

**Using Python 3** (usually pre-installed on macOS/Linux):
```bash
cd math-world/frontend
python3 -m http.server 8000
```

**Using Python 2** (older systems):
```bash
cd math-world/frontend
python -m SimpleHTTPServer 8000
```

**Using Node.js** (if installed):
```bash
cd math-world/frontend
npx http-server -p 8000
```

**Using PHP** (if installed):
```bash
cd math-world/frontend
php -S localhost:8000
```

Then open your browser to: **http://localhost:8000**

---

## What to Test

### Home Page (index.html)

✅ **Visual Elements**:
- Page title "Math Planet" in large, playful font
- Four world cards in a 2x2 grid (on tablets/desktop) or stacked (on mobile)
- Each card shows themed scenery:
  - Addition Forest: Green trees and forest elements
  - Subtraction Mountain: White/gray snowy mountains
  - Multiplication Desert: Yellow sand dunes and cacti
  - Division Ocean: Blue waves and marine elements

✅ **Interactions**:
- Hover over Addition Forest card → Falling leaves animation starts
- Move mouse away → Animation stops
- Click Addition Forest card → Navigate to Addition Forest map
- Try clicking other three cards → Nothing happens (disabled)
- Try keyboard navigation:
  - Press Tab → Addition Forest card gets focus outline
  - Press Enter or Space → Navigate to map
  - Tab to other cards → They are skipped (not focusable)

✅ **Responsive Design**:
- Resize browser window to 768px width → Cards should stack responsively
- All text should remain readable
- Cards should not overflow or overlap

---

### Addition Forest Map (worlds/addition-forest-map.html)

✅ **Visual Elements**:
- Treasure map-style background with forest theme
- Five circular spots arranged in a progression path
- First spot visually highlighted (brighter, larger, or outlined)
- Other four spots visible but not highlighted

✅ **Interactions**:
- Try clicking any spot → Nothing happens (all non-interactive per FR-017)
- Hover over spots → No special effects
- Press Tab → Spots should not be focusable

✅ **Navigation**:
- Browser back button returns to home page
- URL should be `http://localhost:8000/worlds/addition-forest-map.html`

---

## Testing Localization

The site should automatically detect your browser language and display appropriate translations (currently only English is implemented).

### Add a New Language (e.g., Swedish)

1. Copy the English locale file:
   ```bash
   cp frontend/locales/en.json frontend/locales/sv.json
   ```

2. Edit `frontend/locales/sv.json`:
   ```json
   {
     "title": "Matteplaneten",
     "worlds": {
       "additionForest": "Additionsskogen",
       "subtractionMountain": "Subtraktionsberget",
       "multiplicationDesert": "Multiplikationsöknen",
       "divisionOcean": "Divisionshavet"
     },
     "comingSoon": "Kommer snart",
     "map": {
       "title": "Karta över Additionsskogen"
     }
   }
   ```

3. Change your browser language to Swedish or add `?lang=sv` to the URL:
   ```
   http://localhost:8000/?lang=sv
   ```

4. Refresh the page → Text should now be in Swedish!

---

## File Structure Overview

```
frontend/
├── index.html                    # Home page - START HERE
├── worlds/
│   └── addition-forest-map.html  # Map page
├── styles/
│   ├── main.css                  # Global styles, typography, reset
│   ├── cards.css                 # World card layout and styling
│   ├── animations.css            # Falling leaves and hover effects
│   └── map.css                   # Map-specific styles
├── scripts/
│   └── i18n.js                   # Localization loader (~50 lines)
└── locales/
    ├── en.json                   # English translations
    └── README.md                 # Instructions for adding languages
```

---

## Common Issues

### Issue: Localization not working

**Symptom**: Text shows as `[object Object]` or locale keys instead of translated strings

**Solution**: Make sure you're running a local web server (Option 2 above), not opening files directly. Browsers block local file access due to CORS policies.

---

### Issue: Animations not smooth

**Symptom**: Falling leaves animation is choppy or laggy

**Solutions**:
- Test in a different browser (Chrome/Firefox recommended)
- Close other browser tabs consuming resources
- Check if hardware acceleration is enabled in browser settings
- Reduce number of falling leaves in `animations.css` if performance issues persist

---

### Issue: Cards overlap on small screens

**Symptom**: World cards overlap or text is cut off on narrow viewports

**Solution**: This site is designed for tablets (768px+) and desktops per SC-005. For smaller screens, consider viewing in landscape mode or on a larger device. Mobile support may be added in future features.

---

### Issue: Keyboard navigation doesn't work

**Symptom**: Can't focus on Addition Forest card with Tab key

**Solutions**:
- Some browsers have "Tab highlights all elements" disabled by default
- In Safari: Enable "Press Tab to highlight each item on a webpage" in Settings → Advanced
- Try pressing Tab multiple times to skip page elements and reach the card
- Ensure you're testing with a keyboard, not touch/mouse

---

## Next Steps

Once you've verified the site works:

1. **Review the code**: 
   - Start with `index.html` to see structure
   - Check `styles/cards.css` to see how world cards are styled
   - Look at `animations.css` for the falling leaves effect

2. **Experiment**:
   - Add a new language translation
   - Modify SVG scenery in the HTML
   - Change colors in CSS variables (`:root` in `main.css`)
   - Add more falling leaves or adjust animation timing

3. **Read the documentation**:
   - [spec.md](./spec.md) - Full feature specification
   - [plan.md](./plan.md) - Implementation plan
   - [data-model.md](./data-model.md) - Data structure documentation
   - [research.md](./research.md) - Technical decisions and rationale

---

## Performance Benchmarks

Expected performance on modern devices:

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Page Load Time | <1 second | Browser DevTools → Network tab → DOMContentLoaded |
| Animation Response | <200ms | Visual observation on hover (should feel instant) |
| Animation FPS | 60fps | Browser DevTools → Performance tab → Record during hover |
| Lighthouse Score | 90+ | Chrome DevTools → Lighthouse → Run audit |

---

## Development Workflow

When making changes:

1. Edit HTML/CSS/JS files in `frontend/` directory
2. Save changes
3. Refresh browser (Cmd+R / Ctrl+R)
4. Test functionality against acceptance scenarios in [spec.md](./spec.md)
5. Validate Constitution compliance (especially localization and child-friendly design)
6. Commit changes with clear commit message

No build process or compilation required - pure static files!

---

## Getting Help

- **Specification Questions**: See [spec.md](./spec.md) for functional requirements
- **Technical Decisions**: See [research.md](./research.md) for rationale
- **Constitution Compliance**: See [/.specify/memory/constitution.md](../../.specify/memory/constitution.md)
- **Project Issues**: Check GitHub Issues or create a new one

---

**Last Updated**: October 25, 2025  
**Tested On**: Chrome 118, Firefox 119, Safari 17 (macOS), Edge 118 (Windows)
