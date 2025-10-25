# Implementation Plan: Math Planet Learning Site

**Branch**: `001-math-worlds-site` | **Date**: October 25, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-math-worlds-site/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a static HTML/CSS site with a home page featuring four themed world cards (Addition Forest, Subtraction Mountain, Multiplication Desert, Division Ocean) and an Addition Forest map page. The site uses pure HTML and SVG for scenery illustrations with CSS animations for the falling leaves effect on hover. Only Addition Forest is active; other worlds are grayed out with "Coming soon" text. The map page shows five spots with the first highlighted. No backend or data persistence required at this stage; all content is localized and child-friendly per constitution.

## Technical Context

**Language/Version**: HTML5, CSS3, Vanilla JavaScript (minimal, for navigation only)  
**Primary Dependencies**: None (pure static site)  
**Storage**: N/A (no data persistence per FR-019)  
**Testing**: N/A (frontend testing not required per Constitution III)  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge from last 2 years) on tablets and desktops (768px+ width)  
**Project Type**: Static web application  
**Performance Goals**: Page load <1 second, animation response <200ms (SC-004), 60fps for CSS animations  
**Constraints**: No external image files (FR-020), keyboard accessible (A-008), responsive 768px+ (SC-005)  
**Scale/Scope**: 2 HTML pages (home + map), 4 world cards, 5 map spots, localized strings in JSON

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ I. Functional Programming First
**Status**: NOT APPLICABLE  
**Justification**: This is a static HTML/CSS site with minimal JavaScript. No backend code at this stage. Future backend expansion will follow functional programming principles per constitution.

### ✅ II. Python Backend with uv
**Status**: NOT APPLICABLE (YET)  
**Justification**: This feature is pure frontend (static HTML/CSS). Backend will be added in future features and will use Python with uv per constitution.

### ✅ III. Backend Testing
**Status**: NOT APPLICABLE  
**Justification**: No backend code in this feature. When backend is added, 100% test coverage will be required per constitution.

### ✅ IV. Frontend Localization (L10N)
**Status**: COMPLIANT  
**Implementation**: All user-facing strings (world names, "Coming soon", title "Math Planet") will be stored in `frontend/locales/en.json` with structure supporting easy addition of new languages. HTML will reference keys, not hardcoded strings.

### ✅ V. Child-Friendly Design
**Status**: COMPLIANT  
**Implementation**: 
- Cute, colorful world themes (forest/green, mountain/white, desert/yellow, ocean/blue)
- CSS hover animations (falling leaves on Addition Forest)
- Large, clear cards appropriate for ages 7-12
- Decorative, child-friendly fonts
- Clean, modern design without extraneous UI elements
- SVG scenery creating playful, engaging visuals

### ✅ VI. Anti-Engagement-Manipulation
**Status**: COMPLIANT  
**Justification**: No notifications, streaks, daily rewards, time pressure, or dark patterns. Pure educational content with calm, self-paced exploration.

**Overall Status**: ✅ ALL APPLICABLE PRINCIPLES SATISFIED

## Project Structure

### Documentation (this feature)

```text
specs/001-math-worlds-site/
├── plan.md              # This file (/speckit.plan command output)
├── spec.md              # Feature specification (already exists)
├── research.md          # Phase 0 output (created below)
├── data-model.md        # Phase 1 output (created below)
├── quickstart.md        # Phase 1 output (created below)
├── contracts/           # Phase 1 output (N/A for static site)
└── checklists/
    └── requirements.md  # Quality checklist (already exists)
```

### Source Code (repository root)

```text
frontend/
├── index.html           # Home page with 4 world cards
├── worlds/
│   └── addition-forest-map.html  # Addition Forest map page
├── styles/
│   ├── main.css         # Global styles, typography, layout
│   ├── cards.css        # World card styling
│   ├── animations.css   # CSS animations (falling leaves, hover effects)
│   └── map.css          # Map page specific styles
├── scripts/
│   └── i18n.js          # Localization loader (minimal JS)
├── images/
│   └── svg/             # SVG scenery components (inline in HTML or separate files)
│       ├── forest.svg
│       ├── mountain.svg
│       ├── desert.svg
│       ├── ocean.svg
│       └── leaves.svg   # For animation
└── locales/
    ├── en.json          # English strings
    └── README.md        # Instructions for adding new languages

.github/                 # Already exists
.specify/                # Already exists
specs/                   # Already exists
```

**Structure Decision**: Using a web application structure with a dedicated `frontend/` directory at the repository root. This separates the static frontend from future backend code (which will be added in a `backend/` directory per Constitution). The frontend is organized by concern: pages at root level, styles by purpose, SVG assets grouped, and localization files in a dedicated folder. This structure supports the constitution's requirement for easy localization and prepares for future backend integration without requiring major restructuring.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations**: All constitution principles are satisfied or not applicable to this static frontend feature.
