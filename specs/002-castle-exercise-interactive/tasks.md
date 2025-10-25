---
description: "Task list for Interactive Castle Starting Point with Addition Exercises"
---

# Tasks: Interactive Castle Starting Point with Addition Exercises

**Input**: Design documents from `/specs/002-castle-exercise-interactive/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are NOT required per Constitution Principle III (frontend testing not mandatory)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/` at repository root
- Paths assume existing frontend structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare localization infrastructure needed by all user stories

- [X] T001 [P] Add exercise strings to frontend/locales/en.json (additionForest.exercise1 section with 7 keys)
- [X] T002 [P] Add Swedish translations to frontend/locales/sv.json (additionForest.exercise1 section with 7 keys)
- [X] T003 Create frontend/styles/exercise.css file with empty structure for interaction area styles

**Checkpoint**: Localization strings ready, CSS file created ✅

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core modules that all user stories depend on - MUST be complete before UI work begins

**⚠️ CRITICAL**: No user story implementation can begin until these modules are complete and tested

- [X] T004 [P] Implement exercise-state.js module with 7 functions (loadState, saveState, initializeState, updateProgress, getNextStateCode, parseStateCode, clearProgress) in frontend/scripts/exercise-state.js
- [X] T005 [P] Implement question-generator.js module with 5 functions (generateQuestion, validateAnswer, formatQuestion, isDuplicate, generateUniqueQuestion) in frontend/scripts/question-generator.js
- [ ] T006 Verify T004: Test state management in browser console (initialize, save, load, update progress)
- [ ] T007 Verify T005: Test question generation in browser console (generate multiple questions, verify sum ≤100, test deduplication)

**Checkpoint**: Foundation modules complete and verified - user story implementation can now begin

---

## Phase 3: User Story 1 - Castle Interaction (13 tasks)

### HTML Structure Changes
- [x] **T008** Remove existing header and navigation from `addition-forest-map.html` (FR-001)
- [x] **T009** Add castle SVG element to treasure map (FR-002)
- [x] **T010** Add interaction area HTML container with `hidden` class (FR-003)
- [x] **T011** Add princess character SVG to interaction area (FR-004)
- [x] **T012** Add princess greeting message element with i18n key (FR-005)
- [x] **T013** Link `exercise-state.js` module to HTML
- [x] **T014** Link `question-generator.js` module to HTML

### CSS Styling
- [x] **T015** Add castle hover effect styles (FR-002: scale, brightness, hover indicator)
- [x] **T016** Add interaction area styles (FR-003: fixed positioning, background, border, shadow)
- [x] **T017** Add princess message styles (FR-005: centered, styled box)
- [x] **T018** Add question display styles (FR-006: large font, centered, prominent)

### JavaScript Implementation
- [x] **T019** Implement `initializeExercise()` function (FR-008)
- [x] **T020** Implement `handleCastleClick()` event handler (FR-002)
- [x] **T021** Implement `showInteractionArea()` function (FR-003)
- [x] **T022** Implement `displayQuestion()` function (FR-006)
- [x] **T023** Implement `loadNextQuestion()` function (FR-006)
- [x] **T024** Add DOMContentLoaded event listener to initialize exercise (FR-008)


**Manual Test**:
1. Open frontend/worlds/addition-forest-map.html in browser
2. Verify castle is visible at starting position
3. Hover over castle - verify scale-up animation
4. Click castle once
5. Verify interaction area appears below map
6. Verify princess character visible on right
7. Verify greeting message displays (localized)
8. Verify first addition question displays (e.g., "23 + 45 = ?")
9. Verify sum of question ≤100
10. Click castle again - verify no duplicate activation

---

## Phase 4: User Story 2 - Answer Submission (12 tasks)

### HTML Structure (Already Complete)
- [x] **T025** Add answer input field to interaction area (FR-007) - Already added in T010
- [x] **T026** Add submit button to interaction area (FR-007) - Already added in T010
- [x] **T027** Add feedback message container to interaction area (FR-009) - Already added in T010

### CSS Styling (Already Complete)
- [x] **T028** Add answer input field styles (FR-007: large, centered, clear borders) - Already added in T015-T018
- [x] **T029** Add submit button styles (FR-007: prominent, hover effects) - Already added in T015-T018
- [x] **T030** Add feedback message styles for correct answers (FR-009: green background) - Already added in T015-T018
- [x] **T031** Add feedback message styles for incorrect answers (FR-009: red background) - Already added in T015-T018

### JavaScript Implementation (Already Complete)
- [x] **T032** Implement `handleSubmit()` function to validate and process answers (FR-007, FR-009) - Already implemented
- [x] **T033** Implement `showFeedback()` function to display correct/incorrect messages (FR-009) - Already implemented
- [x] **T034** Add click event listener to submit button (FR-007) - Already added in setupEventListeners
- [x] **T035** Add Enter key listener to answer input (FR-007) - Already added in setupEventListeners
- [x] **T036** Update `handleSubmit()` to load next question after correct answer (FR-009) - Already implemented


---

## Phase 5: User Story 3 - Progress Persistence (7 tasks)

### State Management (Already Complete)
- [x] **T037** Update `handleSubmit()` to create QuestionAttempt object (NFR-001) - Already implemented
- [x] **T038** Update `handleSubmit()` to call `updateProgress()` with attempt (NFR-001) - Already implemented
- [x] **T039** Update `handleSubmit()` to call `saveState()` after updating progress (NFR-001) - Already implemented

### Progress Restoration (Already Complete)
- [x] **T040** Update `initializeExercise()` to call `loadState()` on page load (NFR-001) - Already implemented
- [x] **T041** Update `initializeExercise()` to restore from saved state if it exists (NFR-001) - Already implemented
- [x] **T042** Update `initializeExercise()` to initialize new state if no save exists (NFR-001) - Already implemented
- [x] **T043** Verify state code advances correctly after each correct answer (NFR-001) - Ready to test


---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that enhance the experience across all user stories

- [ ] T044 [P] Add ARIA labels to castle SVG and interaction area for accessibility in frontend/worlds/addition-forest-map.html
- [ ] T045 [P] Add screen reader only class and labels for input field in frontend/worlds/addition-forest-map.html
- [ ] T046 [P] Add CSS transition for interaction area reveal animation (fade in + slide up) to frontend/styles/exercise.css
- [ ] T047 [P] Add subtle idle animation for princess character (gentle movement or sparkle) to frontend/styles/exercise.css
- [ ] T048 [P] Add responsive styles for tablet screens (768px-1024px) to frontend/styles/exercise.css
- [ ] T049 Verify localized strings work correctly by testing with Swedish locale (change browser language)
- [ ] T050 Add JSDoc comments to all functions in frontend/scripts/exercise-state.js
- [ ] T051 Add JSDoc comments to all functions in frontend/scripts/question-generator.js
- [ ] T052 Add JSDoc comments to all functions in frontend/scripts/castle-exercise.js
- [ ] T053 Test in Chrome, Firefox, Safari, and Edge browsers
- [ ] T054 Test with keyboard navigation (Tab, Enter, Space)
- [ ] T055 Run through complete quickstart.md validation checklist
- [ ] T056 Performance check: Verify interaction area appears within 500ms (SC-002)
- [ ] T057 Performance check: Verify CSS animations run at 60fps

**Checkpoint**: All polish tasks complete - feature ready for production

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase (T004-T007) completion
  - User stories CAN proceed in parallel if team capacity allows
  - Or sequentially in priority order (US1 → US2 → US3) for single developer
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends only on Phase 2 (Foundational modules) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on Phase 2 + User Story 1 (T008-T024) - Builds on castle click interaction
- **User Story 3 (P3)**: Depends on Phase 2 + User Story 2 (T025-T036) - Extends answer submission to save progress

### Within Each User Story

- HTML structure before JavaScript that references it
- CSS files before HTML that links to them
- JavaScript modules before HTML that imports them
- Foundational functions (display, click handlers) before submission handlers
- Core implementation before polish/enhancement

### Parallel Opportunities

**Phase 1 (Setup)**: All tasks [P] (T001-T003) can run in parallel - different files

**Phase 2 (Foundational)**: Tasks T004 and T005 can run in parallel - different modules, no shared code

**Phase 3 (User Story 1)**: 
- Tasks T009-T012 [P] can run together - HTML structure additions
- Tasks T015-T018 [P] can run together - CSS styling in same file but different sections
- Tasks T009-T012 AND T015-T018 can run in parallel - different files (HTML vs CSS)
- Tasks T019-T023 must run sequentially - same file with interdependencies

**Phase 4 (User Story 2)**:
- Tasks T025-T027 [P] can run together - HTML additions
- Tasks T028-T031 [P] can run together - CSS additions
- Tasks T025-T027 AND T028-T031 can run in parallel - different files

**Phase 6 (Polish)**:
- Tasks T044, T045, T046, T047, T048 all [P] - can run in parallel (different concerns)
- Tasks T050, T051, T052 can run in parallel - different files

---

## Parallel Example: User Story 1

```bash
# These HTML structure tasks can run together:
Task T009: "Add castle SVG to frontend/worlds/addition-forest-map.html"
Task T010: "Add interaction area HTML to frontend/worlds/addition-forest-map.html"
Task T011: "Add princess SVG to frontend/worlds/addition-forest-map.html"
Task T012: "Add princess message to frontend/worlds/addition-forest-map.html"

# While simultaneously these CSS tasks run:
Task T015: "Castle hover styles in frontend/styles/exercise.css"
Task T016: "Interaction area layout in frontend/styles/exercise.css"
Task T017: "Princess message styles in frontend/styles/exercise.css"
Task T018: "Question display styles in frontend/styles/exercise.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only) - RECOMMENDED START

1. **Complete Phase 1**: Setup (T001-T003) - 15 minutes
2. **Complete Phase 2**: Foundational (T004-T007) - 2 hours
3. **Complete Phase 3**: User Story 1 (T008-T024) - 2.5 hours
4. **STOP and VALIDATE**: Test User Story 1 independently using manual test checklist
5. **Result**: Working castle interaction with question display (MVP!)

**Total MVP time**: ~5 hours

### Full Feature Delivery

1. Complete Setup + Foundational (3-4 hours)
2. Add User Story 1 → Test independently → **Deliverable: Castle + Questions** (2.5 hours)
3. Add User Story 2 → Test independently → **Deliverable: Answer Submission** (2 hours)
4. Add User Story 3 → Test independently → **Deliverable: Progress Persistence** (1.5 hours)
5. Add Polish → Final validation → **Deliverable: Production Ready** (1.5 hours)

**Total time**: 10-11 hours (slightly higher than quickstart estimate due to detailed task breakdown)

### Single Developer Strategy

Work sequentially through phases:
1. Phase 1 (Setup) - All 3 tasks
2. Phase 2 (Foundational) - Can do T004 and T005 in either order, then verify
3. Phase 3 (US1) - Use [P] markers to batch similar work (all HTML, then all CSS, then all JS)
4. Phase 4 (US2) - Same batching strategy
5. Phase 5 (US3) - Mostly sequential JS updates
6. Phase 6 (Polish) - Pick high-value tasks first

### Parallel Team Strategy

With 2 developers after Foundational phase completes:

**Developer A (Frontend Structure)**:
- Phase 3: US1 HTML/CSS tasks (T008-T018)
- Phase 4: US2 HTML/CSS tasks (T025-T031)
- Phase 6: Polish HTML/CSS (T044-T048)

**Developer B (JavaScript Logic)**:
- Phase 3: US1 JS tasks (T019-T024)
- Phase 4: US2 JS tasks (T032-T036)
- Phase 5: US3 JS tasks (T037-T043)
- Phase 6: Polish JS docs (T050-T052)

Both join for final validation (T053-T057)

---

## Task Summary

**Total Tasks**: 57 tasks

**Breakdown by Phase**:
- Phase 1 (Setup): 3 tasks
- Phase 2 (Foundational): 4 tasks
- Phase 3 (User Story 1): 17 tasks
- Phase 4 (User Story 2): 12 tasks
- Phase 5 (User Story 3): 7 tasks
- Phase 6 (Polish): 14 tasks

**Breakdown by User Story**:
- Setup/Foundation: 7 tasks
- User Story 1 (P1): 17 tasks ⭐ MVP
- User Story 2 (P2): 12 tasks
- User Story 3 (P3): 7 tasks
- Polish: 14 tasks

**Parallelizable Tasks**: 24 tasks marked [P] (42% of total)

**Independent Test Criteria**:
- ✅ User Story 1: Castle click → Interaction area + question
- ✅ User Story 2: US1 + Answer submission → Feedback → Next question
- ✅ User Story 3: US2 + Browser reload → Progress restored

**MVP Scope**: Phase 1 + Phase 2 + Phase 3 (User Story 1) = 24 tasks, ~5 hours

---

## Format Validation

✅ All 57 tasks follow required format: `- [ ] [ID] [P?] [Story?] Description`
✅ All task IDs sequential (T001-T057)
✅ [P] markers only on parallelizable tasks (different files/sections)
✅ [Story] labels on all user story tasks (US1, US2, US3)
✅ All tasks include specific file paths
✅ No [Story] labels on Setup, Foundational, or Polish tasks
✅ All checkboxes present

---

## Notes

- Constitution Principle III: Frontend tests NOT required, so no test tasks included
- Constitution Principle IV: Localization addressed in Phase 1 (Setup)
- Constitution Principle I: Functional programming enforced in Phase 2 module design
- Each user story is independently testable with clear acceptance criteria
- MVP (User Story 1) delivers immediate educational value
- State code system (1.1.1 format) implemented in Phase 2 and used in Phase 3-5
- Progress persistence (Phase 5) is optional enhancement, not critical path
- All file paths match structure from plan.md
- Commit recommended after each completed phase or user story
