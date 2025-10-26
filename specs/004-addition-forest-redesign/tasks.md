# Tasks: Addition Forest Visual Redesign

**Input**: Design documents from `/specs/004-addition-forest-redesign/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-station-graphics.md

**Tests**: Not required per constitution (frontend-only feature, manual testing only)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend web app**: `frontend/` at repository root
- All paths relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and preparation for redesign

- [ ] T001 Review current implementation in frontend/worlds/addition-forest-map.html to understand existing structure
- [ ] T002 Review current CSS in frontend/styles/map.css to identify styles to preserve vs replace
- [ ] T003 [P] Review exercise-state.js in frontend/scripts/exercise-state.js to understand progress tracking mechanism
- [ ] T004 [P] Create backup branch or tag of current working implementation before major changes

**Checkpoint**: Understanding of current system complete, ready to begin redesign

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Update SVG viewBox from 800x600 to 1000x300 in frontend/worlds/addition-forest-map.html
- [ ] T006 Update progression line to horizontal at Y=150 from x=50 to x=1050 in frontend/worlds/addition-forest-map.html
- [ ] T007 Remove old winding path elements from SVG in frontend/worlds/addition-forest-map.html
- [ ] T008 [P] Update .treasure-map base styles for new aspect ratio in frontend/styles/map.css
- [ ] T009 [P] Verify exercise-state.js totalStations value supports 10 stations in frontend/scripts/exercise-state.js
- [ ] T010 [P] Update locales/en.json with station name keys for stations 2-10 in frontend/locales/en.json
- [ ] T011 [P] Update locales/sv.json with Swedish station names for stations 2-10 in frontend/locales/sv.json

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Linear Progression Navigation (Priority: P1) 🎯 MVP

**Goal**: Users see a clear horizontal line from left to right with exactly 10 visually distinct stations, starting with the castle

**Independent Test**: Load frontend/worlds/addition-forest-map.html in browser and verify all 10 stations appear in horizontal line from left to right, starting with castle at position 1

### Implementation for User Story 1

- [ ] T012 [P] [US1] Update castle station (station 1) position to translate(100, 150) in frontend/worlds/addition-forest-map.html
- [ ] T013 [P] [US1] Create basic station 2 structure at translate(200, 150) with placeholder circle in frontend/worlds/addition-forest-map.html
- [ ] T014 [P] [US1] Create basic station 3 structure at translate(300, 150) with placeholder circle in frontend/worlds/addition-forest-map.html
- [ ] T015 [P] [US1] Create basic station 4 structure at translate(400, 150) with placeholder circle in frontend/worlds/addition-forest-map.html
- [ ] T016 [P] [US1] Create basic station 5 structure at translate(500, 150) with placeholder circle in frontend/worlds/addition-forest-map.html
- [ ] T017 [P] [US1] Create basic station 6 structure at translate(600, 150) with placeholder circle in frontend/worlds/addition-forest-map.html
- [ ] T018 [P] [US1] Create basic station 7 structure at translate(700, 150) with placeholder circle in frontend/worlds/addition-forest-map.html
- [ ] T019 [P] [US1] Create basic station 8 structure at translate(800, 150) with placeholder circle in frontend/worlds/addition-forest-map.html
- [ ] T020 [P] [US1] Create basic station 9 structure at translate(900, 150) with placeholder circle in frontend/worlds/addition-forest-map.html
- [ ] T021 [P] [US1] Create basic station 10 structure at translate(1000, 150) with placeholder circle in frontend/worlds/addition-forest-map.html
- [ ] T022 [US1] Add station numbers (1-10) to all station text elements in frontend/worlds/addition-forest-map.html
- [ ] T023 [US1] Add ARIA labels to all 10 stations using localized strings in frontend/worlds/addition-forest-map.html
- [ ] T024 [US1] Update responsive CSS for mobile viewports (320px-768px) in frontend/styles/map.css
- [ ] T025 [US1] Add horizontal scroll fallback for narrow viewports (<400px) in frontend/styles/map.css
- [ ] T026 [US1] Test horizontal layout at 320px, 768px, 1920px viewport widths

**Checkpoint**: At this point, User Story 1 should be fully functional - 10 stations visible in horizontal line, responsive, accessible

---

## Phase 4: User Story 2 - Enhanced Visual Appeal (Priority: P2)

**Goal**: Each station has a distinct thematic design that tells a visual story, with cohesive decorative elements

**Independent Test**: View map and verify each station has unique themed graphic per contracts/ui-station-graphics.md, decorative elements enhance without cluttering

### Implementation for User Story 2

- [ ] T027 [P] [US2] Replace station 2 placeholder with Tree House SVG graphic per contract in frontend/worlds/addition-forest-map.html
- [ ] T028 [P] [US2] Replace station 3 placeholder with Fountain SVG graphic per contract in frontend/worlds/addition-forest-map.html
- [ ] T029 [P] [US2] Replace station 4 placeholder with Flower Garden SVG graphic per contract in frontend/worlds/addition-forest-map.html
- [ ] T030 [P] [US2] Replace station 5 placeholder with Bridge SVG graphic per contract in frontend/worlds/addition-forest-map.html
- [ ] T031 [P] [US2] Replace station 6 placeholder with Windmill SVG graphic per contract in frontend/worlds/addition-forest-map.html
- [ ] T032 [P] [US2] Replace station 7 placeholder with Lighthouse SVG graphic per contract in frontend/worlds/addition-forest-map.html
- [ ] T033 [P] [US2] Replace station 8 placeholder with Pond SVG graphic per contract in frontend/worlds/addition-forest-map.html
- [ ] T034 [P] [US2] Replace station 9 placeholder with Tower SVG graphic per contract in frontend/worlds/addition-forest-map.html
- [ ] T035 [P] [US2] Replace station 10 placeholder with Treasure Chest SVG graphic per contract in frontend/worlds/addition-forest-map.html
- [ ] T036 [P] [US2] Add decorative tree elements to background layer (z-index -1) in frontend/worlds/addition-forest-map.html
- [ ] T037 [P] [US2] Add decorative bush elements to background layer in frontend/worlds/addition-forest-map.html
- [ ] T038 [P] [US2] Add decorative flower/grass elements to background layer in frontend/worlds/addition-forest-map.html
- [ ] T039 [US2] Verify color palette harmony and WCAG AA contrast ratios using browser dev tools
- [ ] T040 [US2] Add unlock animation for station transitions in frontend/styles/animations.css
- [ ] T041 [US2] Optimize SVG complexity - ensure ≤15 shapes per station and ≤30 total decorative elements
- [ ] T042 [US2] Test visual appeal with target age group (qualitative feedback if possible)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - beautiful themed stations with decorations

---

## Phase 5: User Story 3 - Clear Progress Indication (Priority: P2)

**Goal**: Users can instantly see completed (with checkmark), active (highlighted), and locked (reduced opacity) stations

**Independent Test**: Simulate different progress states in localStorage and verify visual distinctions are immediately clear

### Implementation for User Story 3

- [ ] T043 [P] [US3] Add .locked state styles (40% opacity, grayscale) to .map-spot in frontend/styles/map.css
- [ ] T044 [P] [US3] Add .active state styles (glow effect, highlight) to .map-spot in frontend/styles/map.css
- [ ] T045 [P] [US3] Add .completed state styles (full color, checkmark visible) to .map-spot in frontend/styles/map.css
- [ ] T046 [P] [US3] Add completion indicator SVG (checkmark in circle) to each station in frontend/worlds/addition-forest-map.html
- [ ] T047 [P] [US3] Add spot-glow circle element to each station for active state in frontend/worlds/addition-forest-map.html
- [ ] T048 [US3] Add @keyframes glow-pulse animation for active station in frontend/styles/animations.css
- [ ] T049 [US3] Add @keyframes pop-in animation for completion indicator in frontend/styles/animations.css
- [ ] T050 [US3] Add hover/focus interaction styles for active stations in frontend/styles/map.css
- [ ] T051 [US3] Add keyboard focus indicator (outline) styles in frontend/styles/map.css
- [ ] T052 [US3] Verify state transitions work smoothly (locked → active → completed)
- [ ] T053 [US3] Test with localStorage at different progress levels (0, 3, 5, 10 completed)
- [ ] T054 [US3] Add @media (prefers-reduced-motion) to disable animations in frontend/styles/animations.css
- [ ] T055 [US3] Verify screen reader announces state changes using VoiceOver/NVDA

**Checkpoint**: All user stories should now be independently functional - complete visual redesign with clear progress

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final quality checks

- [ ] T056 [P] Verify exercise interaction still works - click station 1 (castle) opens exercise in frontend/worlds/addition-forest-map.html
- [ ] T057 [P] Test completing station 1 unlocks station 2 correctly via exercise-state.js
- [ ] T058 [P] Verify all station click handlers work for stations 1-10 in frontend/scripts/castle-exercise.js
- [ ] T059 Performance audit: Verify page loads in <2 seconds on 3G connection using Chrome DevTools
- [ ] T060 Performance audit: Verify animations maintain 60fps on mobile using Chrome DevTools Performance tab
- [ ] T061 [P] Accessibility audit: Run Lighthouse accessibility check, verify score ≥90
- [ ] T062 [P] Accessibility audit: Test keyboard navigation (Tab order left-to-right, Enter activates)
- [ ] T063 [P] Accessibility audit: Test screen reader (VoiceOver/NVDA) announces all stations and states
- [ ] T064 Visual regression: Compare with old treasure map, verify improvement in clarity
- [ ] T065 Cross-browser testing: Verify in Chrome, Firefox, Safari, Edge
- [ ] T066 Mobile device testing: Test on actual iOS and Android devices at 320px-768px widths
- [ ] T067 [P] Remove old unused CSS from map.css related to winding path
- [ ] T068 [P] Add code comments to new SVG sections explaining station positioning formula
- [ ] T069 Update quickstart.md validation - verify all acceptance scenarios pass
- [ ] T070 Clean up any console.log debugging statements in JavaScript files
- [ ] T071 Final visual polish: Adjust colors, spacing, or animations based on testing feedback

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 (Linear Progression) can start after Foundational
  - US2 (Visual Appeal) can start after US1 basic structure exists (uses placeholder stations)
  - US3 (Progress Indication) can start after US1 basic structure exists
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 basic station structure (T012-T021) - Replaces placeholders with themed graphics
- **User Story 3 (P2)**: Depends on US1 basic station structure (T012-T021) - Adds state styling to existing stations

### Within Each User Story

#### User Story 1 (Linear Progression)
1. Update castle position (T012)
2. Create all 9 new stations in parallel (T013-T021)
3. Add numbers and ARIA labels (T022-T023)
4. Update responsive CSS (T024-T025)
5. Test at different widths (T026)

#### User Story 2 (Visual Appeal)
1. Replace all placeholders with themed graphics in parallel (T027-T035)
2. Add decorative elements in parallel (T036-T038)
3. Verify colors and add animations (T039-T041)
4. User testing (T042)

#### User Story 3 (Progress Indication)
1. Add state styles in parallel (T043-T045)
2. Add indicator elements in parallel (T046-T047)
3. Add animations (T048-T049)
4. Add interaction styles (T050-T051)
5. Test states and accessibility (T052-T055)

### Parallel Opportunities

**Phase 1 (Setup)**: T003 and T004 can run in parallel

**Phase 2 (Foundational)**: T008, T009, T010, T011 can all run in parallel after T005-T007 complete

**User Story 1**: 
- T012-T021 (create all stations) can run in parallel
- T024-T025 (CSS updates) can run in parallel

**User Story 2**:
- T027-T035 (all themed graphics) can run in parallel
- T036-T038 (decorative elements) can run in parallel

**User Story 3**:
- T043-T045 (state styles) can run in parallel
- T046-T047 (indicator elements) can run in parallel

**Polish Phase**: Many tasks can run in parallel (T056-T058, T061-T063, T067-T068)

---

## Parallel Example: User Story 2 (Enhanced Visual Appeal)

```bash
# Launch all themed graphic tasks together:
Task: "Replace station 2 placeholder with Tree House SVG graphic per contract"
Task: "Replace station 3 placeholder with Fountain SVG graphic per contract"
Task: "Replace station 4 placeholder with Flower Garden SVG graphic per contract"
Task: "Replace station 5 placeholder with Bridge SVG graphic per contract"
Task: "Replace station 6 placeholder with Windmill SVG graphic per contract"
Task: "Replace station 7 placeholder with Lighthouse SVG graphic per contract"
Task: "Replace station 8 placeholder with Pond SVG graphic per contract"
Task: "Replace station 9 placeholder with Tower SVG graphic per contract"
Task: "Replace station 10 placeholder with Treasure Chest SVG graphic per contract"

# Then launch all decorative element tasks together:
Task: "Add decorative tree elements to background layer"
Task: "Add decorative bush elements to background layer"
Task: "Add decorative flower/grass elements to background layer"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (Tasks T001-T004) - ~30 minutes
2. Complete Phase 2: Foundational (Tasks T005-T011) - ~1 hour
3. Complete Phase 3: User Story 1 (Tasks T012-T026) - ~2-3 hours
4. **STOP and VALIDATE**: Test User Story 1 independently
   - Load page in browser
   - Verify 10 stations in horizontal line
   - Test responsive behavior at 320px, 768px, 1920px
   - Test keyboard navigation (Tab, Enter)
5. Deploy/demo if ready - **THIS IS YOUR MVP!**

**Estimated MVP Time**: 4-5 hours

### Incremental Delivery

1. **Foundation** (Setup + Foundational) → Structure ready (~1.5 hours)
2. **MVP** (+ User Story 1) → 10 stations visible, responsive (~3 hours more = 4.5 hours total)
3. **Beautiful** (+ User Story 2) → Themed graphics, decorative elements (~3-4 hours more = 7.5-8.5 hours total)
4. **Complete** (+ User Story 3) → Clear progress states (~2-3 hours more = 9.5-11.5 hours total)
5. **Polished** (+ Phase 6) → Tested, accessible, performant (~1-2 hours more = 10.5-13.5 hours total)

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. **Together**: Complete Setup + Foundational (Tasks T001-T011)
2. **Once Foundational is done, split work**:
   - **Developer A**: User Story 1 (T012-T026) - Basic structure
   - **Developer B**: User Story 2 (T027-T042) - Wait for US1 basic structure, then add themed graphics
   - **Developer C**: User Story 3 (T043-T055) - Wait for US1 basic structure, then add state styles
3. **Together**: Polish phase (T056-T071) after all stories complete

**Estimated Parallel Time**: 6-8 hours (vs 10.5-13.5 hours sequential)

---

## Task Summary

- **Total Tasks**: 71
- **Setup Phase**: 4 tasks
- **Foundational Phase**: 7 tasks
- **User Story 1 (Linear Progression)**: 15 tasks
- **User Story 2 (Enhanced Visual Appeal)**: 16 tasks
- **User Story 3 (Progress Indication)**: 13 tasks
- **Polish Phase**: 16 tasks

### Tasks by User Story

- **US1 Tasks**: T012-T026 (15 tasks) - MVP core
- **US2 Tasks**: T027-T042 (16 tasks) - Visual enhancement
- **US3 Tasks**: T043-T055 (13 tasks) - Progress indication

### Parallel Opportunities

- **Setup**: 2 tasks can run in parallel
- **Foundational**: 4 tasks can run in parallel (after structural changes)
- **US1**: 12 tasks can run in parallel (station creation + CSS)
- **US2**: 12 tasks can run in parallel (themed graphics + decorative elements)
- **US3**: 5 tasks can run in parallel (state styles + indicator elements)
- **Polish**: 9 tasks can run in parallel

**Total Parallelizable Tasks**: 44 out of 71 (62%)

### Independent Test Criteria

**User Story 1 Test**: 
- Open frontend/worlds/addition-forest-map.html
- Verify 10 stations visible in horizontal line
- Verify castle at position 1 (leftmost)
- Verify responsive at 320px, 768px, 1920px
- Verify keyboard Tab order goes left-to-right

**User Story 2 Test**:
- Verify each station has unique themed graphic (not placeholder circle)
- Verify background has trees, bushes, flowers
- Check color contrast with browser dev tools (WCAG AA)
- Ask target age group for feedback on visual appeal

**User Story 3 Test**:
- Clear localStorage, reload: Station 1 active, 2-10 locked (40% opacity)
- Set progress to 3 complete: Stations 1-3 show checkmarks, 4 active, 5-10 locked
- Set progress to all complete: All show checkmarks
- Hover/focus active station: See glow effect

### Suggested MVP Scope

**Minimum Viable Product = User Story 1 only (Tasks T001-T026)**

This delivers:
- ✅ 10 stations in horizontal linear progression
- ✅ Clear left-to-right navigation
- ✅ Responsive design (mobile to desktop)
- ✅ Keyboard accessible
- ✅ Screen reader support
- ✅ Castle at starting position

Users can immediately see and understand the new linear progression, even with basic circles as station graphics. This proves the core concept and can be deployed for early feedback.

**Time to MVP**: ~4-5 hours

**Enhanced Product** = MVP + User Story 2 (add Tasks T027-T042)
- Adds beautiful themed station graphics
- Adds decorative forest elements
- **Time**: +3-4 hours (7.5-8.5 hours total)

**Complete Product** = Enhanced + User Story 3 (add Tasks T043-T055)
- Adds clear progress indication with animations
- **Time**: +2-3 hours (9.5-11.5 hours total)

---

## Notes

- [P] tasks = different files or independent sections, no dependencies
- [Story] label (US1/US2/US3) maps task to specific user story for traceability
- Each user story should be independently completable and testable
- No automated tests per constitution - manual testing throughout
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- SVG graphics follow contracts/ui-station-graphics.md specifications
- All localization uses existing i18n.js system
- Performance target: <2s load, 60fps animations
- Accessibility target: WCAG AA, keyboard nav, screen reader support
