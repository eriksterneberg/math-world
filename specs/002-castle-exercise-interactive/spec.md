# Feature Specification: Interactive Castle Starting Point with Addition Exercises

**Feature Branch**: `002-castle-exercise-interactive`  
**Created**: October 25, 2025  
**Status**: Draft  
**Input**: User description: "Add interactive castle starting point with princess character and addition exercises in Addition Forest map with persistent progress tracking"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Begin First Addition Exercise at Castle (Priority: P1)

A student views the Addition Forest treasure map and sees a small castle as the starting point. When they click on the castle, an interaction area appears below the map showing a princess character who introduces herself and asks for help with a riddle (an addition problem). The student can immediately begin their learning journey.

**Why this priority**: This is the core learning interaction - the first actual math exercise. Without this, students cannot practice addition. This delivers the primary educational value of the feature.

**Independent Test**: Can be fully tested by clicking the castle on the map and verifying that the interaction area appears with the princess and the first addition question. Delivers immediate value by enabling the first math practice session.

**Acceptance Scenarios**:

1. **Given** a student views the Addition Forest map, **When** the page loads, **Then** a small castle SVG image is visible on the map as the starting point
2. **Given** the castle is visible on the map, **When** the student clicks on the castle, **Then** an interaction area (flat rectangle) appears below the treasure map
3. **Given** the interaction area appears, **When** the student looks at it, **Then** they see a princess SVG character displayed on the right side of the rectangle
4. **Given** the princess character is displayed, **When** the student reads the dialogue, **Then** they see the message: "Please help me, I wanted to sneak out of my tower and go exploring the forest, but my magical door wants me to answer some riddles first."
5. **Given** the princess has introduced herself, **When** the dialogue continues, **Then** the princess presents an addition question with two numbers that sum to 100 or less

---

### User Story 2 - Answer Addition Questions (Priority: P2)

After the princess presents an addition question, the student enters their answer in an input field. The student can submit their answer and receive feedback on whether it was correct. The student continues answering questions until they complete the exercise.

**Why this priority**: This completes the learning loop started in P1. While the question presentation is P1, the answer submission and feedback mechanism are necessary to make it a complete learning experience. This can be developed immediately after P1.

**Independent Test**: Can be tested by clicking the castle, receiving a question, entering an answer, and verifying that the system accepts the submission and provides appropriate feedback. Delivers value by enabling students to actually practice and get feedback on their math skills.

**Acceptance Scenarios**:

1. **Given** the princess presents an addition question, **When** the student views the interaction area, **Then** an input field is displayed for entering the answer
2. **Given** an input field is available, **When** the student types a number, **Then** the input accepts numeric characters
3. **Given** the student has entered an answer, **When** they submit it, **Then** the system evaluates whether the answer is correct
4. **Given** the student submitted a correct answer, **When** the evaluation completes, **Then** positive feedback is displayed
5. **Given** the student submitted an incorrect answer, **When** the evaluation completes, **Then** the system shows the correct answer and encourages them to try the next question
6. **Given** the student has completed one question, **When** feedback is displayed, **Then** a new addition question is automatically presented

---

### User Story 3 - Resume Progress After Browser Reload (Priority: P3)

A student answers several addition questions but needs to close their browser. When they return and reload the Addition Forest map page, their progress is preserved - they see they have already completed questions and can continue from where they left off without restarting.

**Why this priority**: This enhances user experience by respecting the student's time and progress, but the core learning can happen without it (students can complete exercises in one session). This is a quality-of-life improvement that can be added after the basic exercise flow works.

**Independent Test**: Can be tested by answering some questions, recording the progress state, reloading the browser, and verifying that the same progress state is restored. Delivers value by preventing frustration from lost progress.

**Acceptance Scenarios**:

1. **Given** a student has answered three addition questions, **When** they reload the browser page, **Then** their progress (three questions answered) is restored
2. **Given** progress has been restored, **When** the page loads, **Then** the student sees their answer history from previous questions
3. **Given** progress has been restored, **When** the princess presents the next question, **Then** it is the fourth question (continuing from where they left off)
4. **Given** a student has not yet started any exercises, **When** they load the page for the first time, **Then** no previous progress is loaded and they start fresh

---

### Edge Cases

- What happens when a student tries to submit a non-numeric answer? The input field should only accept numeric characters, preventing invalid submissions.
- What happens when a student leaves the answer field blank and tries to submit? The system should prompt them to enter an answer before allowing submission.
- What happens if the browser's storage is disabled or cleared? The student will start fresh without any saved progress - this is acceptable as progress tracking is a convenience feature, not critical to core functionality.
- What happens when addition problems would exceed 100? The system must generate questions where both numbers and their sum respect the constraint that the total is no larger than 100.
- What happens when a student clicks the castle multiple times? After the first click, additional clicks should have no effect since the interaction area is already displayed.
- What happens on very small screens? The layout should adapt so the interaction area and princess character remain visible and usable on tablet-sized screens (minimum 768px width).

## Requirements *(mandatory)*

### Functional Requirements

#### Castle and Map UI

- **FR-001**: System MUST remove all existing UI elements from the Addition Forest map page except the treasure map SVG itself
- **FR-002**: System MUST add a small castle SVG graphic to the treasure map at the starting position
- **FR-003**: Castle SVG MUST be clickable (interactive)
- **FR-004**: Castle MUST be visually distinct and recognizable as a castle to children aged 7-12

#### Interaction Area

- **FR-005**: System MUST display a flat, lying-down rectangle below the treasure map when the castle is clicked
- **FR-006**: Interaction rectangle MUST span the full width available below the map
- **FR-007**: Interaction rectangle MUST remain visible once activated (not disappear unless page is reloaded)
- **FR-008**: System MUST display a princess character SVG on the right side of the interaction rectangle
- **FR-009**: Princess character MUST be visually recognizable as a princess to children aged 7-12

#### Princess Dialogue and Questions

- **FR-010**: System MUST display the princess's introductory message: "Please help me, I wanted to sneak out of my tower and go exploring the forest, but my magical door wants me to answer some riddles first."
- **FR-011**: System MUST present addition questions in the format "[number] + [number] = ?"
- **FR-012**: Both numbers in each addition question MUST be positive integers
- **FR-013**: The sum of the two numbers in each question MUST NOT exceed 100
- **FR-014**: Each individual number in a question SHOULD be between 1 and 99 to ensure the sum constraint can be met
- **FR-015**: System MUST generate a variety of different addition questions (not the same question repeatedly)

#### Answer Input and Validation

- **FR-016**: System MUST provide an input field for the student to enter their answer
- **FR-017**: Input field MUST accept numeric input only
- **FR-018**: System MUST provide a submit button or mechanism to submit the answer
- **FR-019**: System MUST NOT allow submission of empty answers
- **FR-020**: System MUST evaluate the submitted answer against the correct sum
- **FR-021**: System MUST display feedback indicating whether the answer was correct or incorrect
- **FR-022**: For incorrect answers, system MUST display the correct answer
- **FR-023**: System MUST automatically present a new question after feedback is shown

#### Progress Persistence

- **FR-024**: System MUST store the student's progress in browser storage (localStorage or sessionStorage)
- **FR-025**: Progress storage MUST include which questions have been answered
- **FR-026**: Progress storage MUST include the answers provided by the student
- **FR-027**: System MUST restore saved progress when the page is reloaded
- **FR-028**: System MUST continue with the next new question after progress is restored
- **FR-029**: If no saved progress exists, system MUST start fresh with the first question

### Key Entities

- **Castle**: The starting point on the treasure map, represented as a clickable SVG graphic that triggers the exercise interaction area
- **Princess Character**: An SVG character displayed in the interaction area who provides context, dialogue, and presents addition questions to the student
- **Addition Question**: A math problem consisting of two positive integers (each ≤99) whose sum does not exceed 100, presented in the format "A + B = ?"
- **Student Answer**: A numeric response provided by the student, which is evaluated for correctness and stored as part of progress
- **Exercise Progress**: A record of completed questions and student answers, persisted in browser storage to allow session resumption
- **Interaction Area**: A rectangular UI region below the treasure map where all exercise interactions occur, containing the princess character, dialogue, questions, input field, and feedback

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Students can identify and click the castle starting point within 5 seconds of viewing the Addition Forest map
- **SC-002**: The interaction area with princess character appears within 500 milliseconds of clicking the castle
- **SC-003**: Students can read the princess's introductory message and understand they need to answer addition questions
- **SC-004**: Students can complete one addition question (read, answer, submit, receive feedback) in under 45 seconds on average
- **SC-005**: All addition questions generated have sums that do not exceed 100 (100% compliance)
- **SC-006**: When students reload the browser after answering questions, their progress is restored and they can continue from the next question
- **SC-007**: Students do not encounter the same addition question twice in a single session
- **SC-008**: The interaction area and princess character remain readable and usable on screens 768px width and above
- **SC-009**: 90% of students in the target age group (7-12 years) successfully submit their first answer without assistance

## Assumptions

- **A-001**: Students use modern browsers (Chrome, Firefox, Safari, Edge) that support localStorage
- **A-002**: Students access the site on devices with screens 768px width or larger (tablets and desktops)
- **A-003**: Progress persistence uses browser localStorage, which may be cleared by users or browser settings
- **A-004**: No backend server is required; all logic runs client-side with vanilla JavaScript
- **A-005**: Princess character dialogue is in English (internationalization may come in future iterations)
- **A-006**: Students do not need to complete a specific number of questions; they can practice as many as they want
- **A-007**: No time limits are imposed on answering questions; students can take as long as they need
- **A-008**: The castle replaces any existing spot/marker at the starting position on the treasure map
- **A-009**: SVG graphics for castle and princess can be created as simple, child-friendly illustrations without requiring professional artwork
- **A-010**: Feedback messages are brief and encouraging, appropriate for the 7-12 age group
- **A-011**: Questions are randomly generated within the constraints (sum ≤ 100) rather than following a predetermined sequence
