# Implementation Plan: Addition Forest Visual Redesign

**Branch**: `004-addition-forest-redesign` | **Date**: 2025-10-25 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-addition-forest-redesign/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Transform the Addition Forest map from a confusing winding treasure map to a simple, visually appealing horizontal linear progression with 10 distinct themed stations. Replace the complex curved path with evenly-spaced stations along a horizontal line from left to right, starting with the existing castle graphic. Create unique thematic designs for each station (castle, tree house, fountain, flower garden, bridge, windmill, lighthouse, pond, tower, treasure chest) while maintaining progress tracking, accessibility, and responsive design.

## Technical Context

**Language/Version**: HTML5, CSS3, Vanilla JavaScript (ES6+)  
**Primary Dependencies**: None (pure static site, no frameworks)  
**Storage**: Browser localStorage for progress persistence  
**Testing**: Manual testing, visual regression testing (no automated frontend tests per constitution)  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge)  
**Project Type**: Web application (frontend only)  
**Performance Goals**: Page load < 2 seconds, smooth 60fps animations, no visual jank  
**Constraints**: Must work on viewport widths 320px-1920px, WCAG AA contrast compliance, maintain existing localStorage state structure  
**Scale/Scope**: 10 stations (up from 5), single HTML file redesign, CSS updates, minimal JS changes for station count

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| **I. Functional Programming First** | ✅ PASS | Minimal JavaScript changes needed; existing code follows functional patterns |
| **II. Python Backend with uv** | ✅ N/A | Frontend-only feature, no backend changes |
| **III. Backend Testing** | ✅ N/A | Frontend-only feature, no backend testing required per constitution |
| **IV. Frontend Localization (L10N)** | ✅ PASS | All new text (if any) will use existing i18n.js system and locales/en.json, locales/sv.json |
| **V. Child-Friendly Design** | ✅ PASS | Core focus of feature - improving visual appeal for children with cute themed stations and smooth animations |
| **VI. Anti-Engagement-Manipulation** | ✅ PASS | No engagement tricks added; purely visual redesign to improve learning experience |

**Result**: All applicable principles pass. Feature is constitution-compliant.

### Post-Design Re-evaluation

*Phase 1 Design Complete. Re-checking constitution compliance after detailed design.*

| Principle | Status | Design Review |
|-----------|--------|---------------|
| **I. Functional Programming First** | ✅ PASS | Reviewed data-model.md and contracts: No new OOP patterns introduced. Existing functional JS modules maintained. |
| **II. Python Backend with uv** | ✅ N/A | No backend changes in design. |
| **III. Backend Testing** | ✅ N/A | No backend code to test. |
| **IV. Frontend Localization (L10N)** | ✅ PASS | Design includes localization contract in quickstart.md. All station names and ARIA labels will be in locale JSON files (en.json, sv.json). |
| **V. Child-Friendly Design** | ✅ PASS | Design extensively addresses child appeal: 10 unique themed graphics (castle, tree house, fountain, flower garden, bridge, windmill, lighthouse, pond, tower, treasure chest) with vibrant colors, smooth animations, and clear visual progression. |
| **VI. Anti-Engagement-Manipulation** | ✅ PASS | Design contains no engagement manipulation: no streaks, no notifications, no time pressure. Pure learning path visualization. |

**Post-Design Result**: All principles remain compliant. Design phase did not introduce any constitutional violations. Ready to proceed to task breakdown (Phase 2).

## Project Structure

### Documentation (this feature)

```text
specs/004-addition-forest-redesign/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── ui-station-graphics.md  # SVG structure contract for 10 station themes
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
frontend/
├── worlds/
│   └── addition-forest-map.html    # PRIMARY: Complete HTML/SVG redesign
├── styles/
│   ├── map.css                     # MAJOR UPDATE: New linear layout styles
│   ├── animations.css              # UPDATE: Station unlock/complete transitions
│   └── main.css                    # REFERENCE: Use existing CSS variables
├── scripts/
│   ├── castle-exercise.js          # MINOR: Update for 10 stations if needed
│   ├── exercise-state.js           # REVIEW: Ensure 10-station compatibility
│   └── i18n.js                     # REFERENCE: Use existing for any new text
└── locales/
    ├── en.json                     # UPDATE: Add any new UI text keys
    └── sv.json                     # UPDATE: Add any new UI text keys
```

**Structure Decision**: Web application (frontend only). This is a visual redesign affecting primarily the HTML/SVG structure of the map and its CSS styling. The existing modular JavaScript architecture (i18n, exercise-state, castle-exercise) will be preserved with minimal modifications to support 10 stations instead of 5.

## Complexity Tracking

> No violations of constitutional principles. This section intentionally left empty.
