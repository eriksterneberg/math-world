````markdown
# Implementation Plan: Interactive Castle Starting Point with Addition Exercises

**Branch**: `002-castle-exercise-interactive` | **Date**: October 25, 2025 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-castle-exercise-interactive/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Transform the Addition Forest treasure map into an interactive learning experience by adding a clickable castle starting point that triggers an exercise interaction area. When clicked, a princess character appears in a dedicated interaction rectangle below the map, presenting addition questions (sum ≤100) to students. Student answers and progress are stored in browser localStorage with a state code system (format: world.exercise.question, e.g., "1.1.1" for first question of first exercise in first world) enabling progress tracking and future state resumption capabilities.

## Technical Context

**Language/Version**: HTML5, CSS3, Vanilla JavaScript (ES6+)  
**Primary Dependencies**: None (pure static site, no frameworks)  
**Storage**: Browser localStorage for progress persistence  
**Testing**: Not required for frontend per constitution (Principle III)  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge) on tablets and desktops (minimum 768px width)  
**Project Type**: Web frontend (static site)  
**Performance Goals**: Interaction area appears within 500ms of castle click, smooth CSS animations at 60fps  
**Constraints**: Pure client-side implementation, no backend required, localStorage as sole persistence mechanism, works offline  
**Scale/Scope**: Single-page enhancement to existing Addition Forest map, ~3-5 small JavaScript modules for exercise logic, state management, and UI interactions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Initial Check (Pre-Phase 0)

#### Principle I: Functional Programming First ✅ PASS
- **Status**: Compliant
- **Implementation**: JavaScript code will use functional paradigm with pure functions for question generation, answer validation, and state management. Functions will be small, composable, and independently testable (even though testing is not required per Principle III).

#### Principle II: Python Backend with uv ✅ PASS
- **Status**: Not Applicable
- **Reason**: This is a pure frontend feature with no backend requirements. All logic runs client-side in the browser.

#### Principle III: Backend Testing ✅ PASS
- **Status**: Not Applicable
- **Reason**: No backend code in this feature. Frontend testing is explicitly not required per constitution.

#### Principle IV: Frontend Localization (L10N) ⚠️ NEEDS ATTENTION
- **Status**: Requires implementation
- **Action Required**: Princess dialogue message ("Please help me, I wanted to sneak out of my tower and go exploring the forest, but my magical door wants me to answer some riddles first.") and UI strings (button labels, feedback messages) must be added to existing localization files (`frontend/locales/en.json`, `frontend/locales/sv.json`).
- **Implementation**: Use existing i18n.js system already present in the project.

#### Principle V: Child-Friendly Design ✅ PASS
- **Status**: Compliant by design
- **Implementation**: Castle and princess SVG graphics will use cute, child-friendly styling. CSS animations for hover effects and interactions. Clean UI with only essential elements (princess character, question text, input field, submit button). Follows existing Math World visual language.

#### Principle VI: Anti-Engagement-Manipulation ✅ PASS
- **Status**: Fully compliant
- **Implementation**: No engagement manipulation features. Progress tracking serves legitimate educational purpose (resume learning session) without streak systems, time pressure, or dark patterns. State code system (1.1.1) is for navigation aid, not gamification.

**Initial Gate Status**: ✅ **PASS** (with localization to be implemented per existing project pattern)

---

### Post-Phase 1 Re-check

#### Principle I: Functional Programming First ✅ PASS
- **Status**: Fully implemented in design
- **Evidence**: 
  - `exercise-state.js`: Pure functions for state operations (loadState, saveState, updateProgress, etc.)
  - `question-generator.js`: Pure functions for question generation and validation
  - `castle-exercise.js`: UI coordination using composed pure functions
  - No classes used, all functions small and focused
  - Explicit data flow with no hidden mutable state
- **Contracts**: All module interfaces documented in `contracts/module-interfaces.md` show functional paradigm

#### Principle II: Python Backend with uv ✅ PASS
- **Status**: Not Applicable (unchanged from initial check)

#### Principle III: Backend Testing ✅ PASS
- **Status**: Not Applicable (unchanged from initial check)

#### Principle IV: Frontend Localization (L10N) ✅ PASS
- **Status**: Fully designed and documented
- **Evidence**:
  - All UI strings defined in localization files (en.json, sv.json)
  - Keys documented in research.md section 7
  - Integration with existing i18n.js system specified
  - Quickstart Phase 3 provides implementation steps
- **Localization keys added**:
  - `additionForest.exercise1.princessGreeting`
  - `additionForest.exercise1.questionPrompt`
  - `additionForest.exercise1.answerPlaceholder`
  - `additionForest.exercise1.submitButton`
  - `additionForest.exercise1.correctFeedback`
  - `additionForest.exercise1.incorrectFeedback`
  - `additionForest.exercise1.inputLabel`

#### Principle V: Child-Friendly Design ✅ PASS
- **Status**: Fully designed with specific styling
- **Evidence**:
  - Castle SVG: Cute geometric design with bright colors (purples, yellows)
  - Princess SVG: Simple, friendly character with crown and dress
  - CSS animations: Hover effects, smooth transitions
  - Clean layout: Only essential elements (princess, question, input, button)
  - Color scheme: Soft, inviting colors (greens, purples, pinks)
  - Feedback messages: Encouraging language ("Excellent work!", "Let's keep trying!")
- **Quickstart Phase 2**: Complete styling specifications provided

#### Principle VI: Anti-Engagement-Manipulation ✅ PASS
- **Status**: Fully compliant (unchanged from initial check)
- **Evidence**:
  - No streak systems in design
  - No time limits (students can take as long as needed per A-007)
  - No notifications or reminders
  - No daily rewards
  - Progress tracking purely for educational continuity
  - State codes (1.1.1) are navigation aids, not scores

**Final Gate Status**: ✅ **PASS** - All constitutional principles satisfied in design phase

All implementation details comply with constitutional requirements. No violations or trade-offs needed.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
frontend/
├── worlds/
│   └── addition-forest-map.html      # [MODIFIED] Add castle SVG, interaction area, exercise UI
├── scripts/
│   ├── i18n.js                       # [EXISTING] Used for localization
│   ├── exercise-state.js             # [NEW] State management, localStorage, progress tracking
│   ├── question-generator.js         # [NEW] Generate random addition questions (sum ≤100)
│   └── castle-exercise.js            # [NEW] Main exercise logic, UI interactions, event handlers
├── styles/
│   ├── main.css                      # [EXISTING] Base styles
│   ├── map.css                       # [EXISTING] Treasure map styles
│   └── exercise.css                  # [NEW] Interaction area, princess character, input styling
└── locales/
    ├── en.json                       # [MODIFIED] Add princess dialogue, UI strings
    └── sv.json                       # [MODIFIED] Add Swedish translations
```

**Structure Decision**: Using existing frontend structure (Option 2 - Web application pattern already established in project). All new functionality integrates into the current `frontend/` directory. JavaScript modules follow functional programming principles with clear separation of concerns: state management (exercise-state.js), question logic (question-generator.js), and UI coordination (castle-exercise.js).

## Complexity Tracking

> **No violations to track - Constitution Check passed**

All constitutional principles are either compliant or not applicable to this frontend-only feature. No complexity trade-offs or justifications required.
