# Tasks: Language Switcher Feature

## Feature: Language Switcher (specs/003-add-language-switcher)

---

## Phase 1: Setup
- [x] T001 Create contracts/ directory in specs/003-add-language-switcher/contracts/
- [x] T002 Add .visually-hidden CSS class to frontend/styles/main.css

---

## Phase 2: Foundational
- [x] T003 Create language switcher HTML snippet in frontend/scripts/
- [x] T004 Add language codes and labels to frontend/locales/en.json and sv.json
- [x] T005 Add language preference key to localStorage in frontend/scripts/i18n.js

---

## Phase 3: User Story 1 (P1) - As a user, I can switch the site language at any time using a visible, accessible control present on every page, and my preference is remembered across reloads.
- [x] T006 [US1] Insert language switcher UI at top of every page in frontend/index.html and frontend/worlds/addition-forest-map.html
- [x] T007 [P] [US1] Implement event handler for language switcher in frontend/scripts/i18n.js
- [x] T008 [P] [US1] On switch, update localStorage and trigger i18n.js to re-translate all text in frontend/scripts/i18n.js
- [x] T009 [US1] Ensure language switcher is fully keyboard and screen reader accessible in frontend/index.html and frontend/worlds/addition-forest-map.html
- [x] T010 [US1] Default to English if no preference is set in frontend/scripts/i18n.js
- [x] T011 [US1] Test language switcher for persistence, accessibility, and correct UI update (manual test)

---

## Phase 4: Polish & Cross-Cutting Concerns
- [x] T012 Add documentation for language switcher usage and extension in specs/003-add-language-switcher/quickstart.md
- [x] T013 Refactor for extensibility (easy addition of new languages) in frontend/scripts/i18n.js and switcher UI
- [x] T014 Review color contrast and ARIA labeling for accessibility in frontend/styles/main.css and switcher UI

---

## Dependencies
- Phase 1 → Phase 2 → Phase 3 (US1) → Phase 4
- All [P] tasks in Phase 3 can be executed in parallel after T006

---

## Parallel Execution Examples
- T007, T008 can be implemented in parallel after T006
- T013, T014 can be done in parallel after T012

---

## Independent Test Criteria (User Story 1)
- Language switcher is visible and accessible on every page
- Switching language updates all translatable text immediately
- Language preference is remembered across reloads
- Switcher is fully keyboard and screen reader accessible
- Defaults to English if unset

---

## MVP Scope
- Complete all tasks in Phase 1, Phase 2, and Phase 3 (User Story 1)

---

## Format Validation
- All tasks use strict checklist format with Task ID, [P] marker, [US1] label, and file paths
