# Research: Math Planet Learning Site

**Feature**: 001-math-worlds-site  
**Date**: October 25, 2025  
**Purpose**: Resolve technical unknowns and establish best practices for static HTML/CSS site with SVG scenery and animations

## Research Tasks

### 1. SVG Scenery Creation Techniques

**Question**: What's the best approach for creating cute, child-friendly SVG scenery (forest, mountain, desert, ocean) that's maintainable and performant?

**Decision**: Use inline SVG in HTML with CSS styling and CSS variables for colors

**Rationale**:
- Inline SVG allows direct CSS manipulation for colors, hover effects, and animations
- No external HTTP requests (performance requirement: <1s page load)
- Easy to maintain and modify without image editing software
- CSS variables enable easy theme customization
- Supports accessibility (title/desc tags for screen readers)
- Child-friendly "cute" style achievable with simple shapes, rounded corners, and bright colors

**Alternatives Considered**:
- External SVG files: Rejected due to additional HTTP requests and complexity
- Canvas API: Rejected - not semantic, harder to maintain, poor accessibility
- CSS-only shapes: Rejected - too limited for detailed scenery like forests and mountains
- Font icons: Rejected - not flexible enough for custom scenery designs

**Implementation Notes**:
- Use SVG `<g>` groups for logical scenery components (trees, clouds, waves, etc.)
- Apply `viewBox` for responsive scaling
- Keep SVG code clean with semantic IDs and classes
- Use simple geometric shapes (circles, paths, polygons) for cute aesthetic

---

### 2. CSS Animation for Falling Leaves

**Question**: How to implement smooth, performant falling leaves animation that starts on hover and stops on mouse leave?

**Decision**: CSS keyframe animations with `animation-play-state` controlled by `:hover` pseudo-class

**Rationale**:
- Pure CSS solution (no JavaScript required per A-009)
- Hardware-accelerated transforms (translate, rotate) ensure 60fps performance
- `animation-play-state: paused` as default, `running` on hover provides clean start/stop
- Multiple animation delays create natural, staggered falling effect
- Meets <200ms response time requirement (SC-004)

**Alternatives Considered**:
- JavaScript-based animation: Rejected - unnecessary complexity, constitution prefers minimal JS
- SVG SMIL animations: Rejected - deprecated in some browsers
- Intersection Observer API: Rejected - overkill for simple hover effect
- GIF/video: Rejected - violates FR-020 (no external image files), not interactive

**Implementation Notes**:
```css
/* Leaf animation example */
@keyframes fall {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(300px) rotate(360deg); opacity: 0; }
}

.leaf {
  animation: fall 3s ease-in infinite;
  animation-play-state: paused;
}

.addition-forest-card:hover .leaf {
  animation-play-state: running;
}
```
- Use multiple leaves with varying `animation-delay` (e.g., 0s, 0.5s, 1s, 1.5s)
- Apply `will-change: transform` for performance hint
- Use `opacity` fade for smooth disappearance

---

### 3. Localization (i18n) Implementation

**Question**: What's the simplest way to implement JSON-based localization for a static site per Constitution IV?

**Decision**: Minimal JavaScript i18n loader with JSON locale files and `data-i18n` attributes

**Rationale**:
- Meets constitution requirement: "strings in JSON files where anyone can easily add a new language"
- Simple implementation (~50 lines of JS)
- No build step or complex framework needed
- Easy for non-technical contributors to add languages
- Graceful fallback to English if translation missing

**Alternatives Considered**:
- Server-side localization: Rejected - no backend yet, would require build process
- i18next or similar library: Rejected - overkill for simple static site, adds dependency
- Multiple HTML files per language: Rejected - maintenance nightmare, not scalable
- Browser's native `<template>` with slots: Rejected - too complex, poor browser support

**Implementation Notes**:

JSON structure (`frontend/locales/en.json`):
```json
{
  "title": "Math Planet",
  "worlds": {
    "additionForest": "Addition Forest",
    "subtractionMountain": "Subtraction Mountain",
    "multiplicationDesert": "Multiplication Desert",
    "divisionOcean": "Division Ocean"
  },
  "comingSoon": "Coming soon",
  "map": {
    "title": "Addition Forest Map"
  }
}
```

HTML usage:
```html
<h1 data-i18n="title">Math Planet</h1>
<span data-i18n="worlds.additionForest">Addition Forest</span>
```

JavaScript loader:
```javascript
// Load locale JSON, find all [data-i18n] elements, replace textContent
// Default to 'en', support language detection from navigator.language
```

---

### 4. Responsive Design Approach

**Question**: How to ensure cards and map display correctly on tablets (768px+) per SC-005 while maintaining child-friendly large touch targets?

**Decision**: CSS Grid for card layout with mobile-first responsive design and CSS custom properties for consistent sizing

**Rationale**:
- CSS Grid provides flexible, maintainable 2x2 card layout
- Mobile-first approach with `min-width` media queries
- Touch targets 44px+ meet accessibility guidelines for children
- CSS variables allow consistent spacing and sizing across breakpoints
- No JavaScript needed for responsive behavior

**Alternatives Considered**:
- Flexbox: Rejected - Grid is cleaner for 2D card layout
- Fixed pixel sizes: Rejected - not responsive, fails on different screen sizes
- Bootstrap or Tailwind: Rejected - unnecessary dependency for simple layout
- `vh/vw` units only: Rejected - can cause issues with browser chrome on tablets

**Implementation Notes**:
```css
:root {
  --card-min-width: 300px;
  --card-gap: 2rem;
  --touch-target-min: 44px;
}

.world-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--card-min-width), 1fr));
  gap: var(--card-gap);
  padding: 2rem;
}

@media (min-width: 768px) {
  .world-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .world-cards {
    max-width: 1400px;
    margin: 0 auto;
  }
}
```

---

### 5. Accessibility for Keyboard Navigation

**Question**: How to ensure Addition Forest card is keyboard accessible per A-008 while inactive cards are not?

**Decision**: Use semantic `<a>` element for active card, `<div>` for inactive cards, with proper ARIA attributes and focus styles

**Rationale**:
- Semantic HTML: `<a>` naturally keyboard accessible with Enter/Space
- `<div>` for inactive cards prevents accidental keyboard activation
- `tabindex="-1"` and `aria-disabled="true"` clearly mark inactive state
- Custom `:focus-visible` styles provide clear focus indicators for keyboard users
- No JavaScript event listeners needed for basic navigation

**Alternatives Considered**:
- All cards as `<button>`: Rejected - buttons semantically imply actions, not navigation
- JavaScript event listeners on all cards: Rejected - overcomplicated, semantic HTML is better
- `tabindex="0"` on divs: Rejected - makes non-functional elements focusable (confusing UX)
- Skip links only: Rejected - doesn't solve card accessibility

**Implementation Notes**:
```html
<!-- Active card -->
<a href="worlds/addition-forest-map.html" class="world-card active">
  <!-- Card content -->
</a>

<!-- Inactive card -->
<div class="world-card inactive" aria-disabled="true">
  <!-- Card content with "Coming soon" -->
</div>
```

```css
.world-card.active:focus-visible {
  outline: 3px solid #4A90E2;
  outline-offset: 4px;
}

.world-card.inactive {
  pointer-events: none;
  opacity: 0.5;
  filter: grayscale(100%);
}
```

---

### 6. Child-Friendly Typography

**Question**: Which font choices and sizing best serve ages 7-12 per A-005 and Constitution V?

**Decision**: Use Google Fonts "Fredoka" for headings (playful, rounded) and "Nunito" for body text (readable, friendly) with minimum 16px base size

**Rationale**:
- Fredoka: Playful, rounded letterforms perfect for "cute" aesthetic, highly legible for children
- Nunito: Sans-serif with rounded terminals, excellent readability, professional yet friendly
- Google Fonts: Free, reliable CDN, no licensing issues
- 16px+ base size ensures readability on tablets
- High contrast ratios meet WCAG AA standards for children

**Alternatives Considered**:
- Comic Sans: Rejected - unprofessional, poor kerning, considered dated
- System fonts only: Rejected - not distinctive enough for "cute" brand
- Custom handwritten fonts: Rejected - often poor readability, accessibility concerns
- Single font for everything: Rejected - need hierarchy (display vs body text)

**Implementation Notes**:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=Nunito:wght@400;600&display=swap" rel="stylesheet">
```

```css
:root {
  --font-heading: 'Fredoka', sans-serif;
  --font-body: 'Nunito', sans-serif;
  --font-size-base: 16px;
  --font-size-title: 3rem;
  --font-size-card: 1.5rem;
}

body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
}

h1, h2, .world-name {
  font-family: var(--font-heading);
}
```

---

## Summary of Decisions

| Area | Technology/Approach | Key Benefit |
|------|-------------------|-------------|
| Scenery | Inline SVG with CSS | No external requests, easy styling, accessible |
| Animation | CSS keyframes + `:hover` | Performant, no JS, <200ms response |
| Localization | JSON + minimal JS loader | Easy contributions, constitution compliant |
| Layout | CSS Grid mobile-first | Responsive, clean 2x2 grid, maintainable |
| Accessibility | Semantic HTML + ARIA | Keyboard navigation, screen reader support |
| Typography | Google Fonts (Fredoka + Nunito) | Child-friendly, readable, professional |

All decisions align with Constitution principles (especially IV: Localization, V: Child-Friendly Design) and meet functional requirements (FR-020: HTML/SVG only, FR-008: hover animation, SC-004: <200ms, SC-005: 768px+ responsive).
