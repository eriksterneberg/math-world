# Module Contracts: Castle Exercise Interactive

**Feature**: 002-castle-exercise-interactive  
**Date**: October 25, 2025

This document defines the functional interfaces (contracts) for the JavaScript modules implementing the castle exercise feature. Since this is a frontend-only feature with no HTTP APIs, these contracts describe pure function signatures and their behaviors.

---

## exercise-state.js

**Purpose**: Manages exercise progress state and localStorage persistence.

### Functions

#### `loadState(): ExerciseProgress | null`

Loads the current exercise progress from localStorage.

**Parameters**: None

**Returns**: 
- `ExerciseProgress` object if saved state exists and is valid
- `null` if no saved state or state is invalid/corrupted

**Side Effects**: Reads from `localStorage`

**Example**:
```javascript
const state = loadState();
if (state === null) {
  // Start fresh
} else {
  // Resume from state.currentState
}
```

---

#### `saveState(state: ExerciseProgress): boolean`

Persists exercise progress to localStorage.

**Parameters**:
- `state` (ExerciseProgress): The progress object to save

**Returns**: 
- `true` if save succeeded
- `false` if save failed (e.g., localStorage full or unavailable)

**Side Effects**: Writes to `localStorage`

**Validation**: 
- Validates `state` structure before saving
- Updates `lastUpdated` timestamp automatically

**Example**:
```javascript
const success = saveState({
  currentState: "1.1.2",
  progress: { "1.1.1": {...} },
  sessionStart: 1729871950000,
  lastUpdated: Date.now()
});
```

---

#### `initializeState(startingCode: StateCode): ExerciseProgress`

Creates a new, empty progress state starting at the given state code.

**Parameters**:
- `startingCode` (StateCode): Where to begin (typically "1.1.1")

**Returns**: Fresh `ExerciseProgress` object

**Side Effects**: None (pure function)

**Example**:
```javascript
const newState = initializeState("1.1.1");
// { currentState: "1.1.1", progress: {}, sessionStart: <now>, lastUpdated: <now> }
```

---

#### `updateProgress(state: ExerciseProgress, attempt: QuestionAttempt): ExerciseProgress`

Adds a completed question attempt to the progress and advances to next question.

**Parameters**:
- `state` (ExerciseProgress): Current progress state
- `attempt` (QuestionAttempt): The completed question attempt

**Returns**: New `ExerciseProgress` object with:
- `attempt` added to `progress` map
- `currentState` incremented to next question
- `lastUpdated` timestamp updated

**Side Effects**: None (pure function - returns new object)

**Validation**:
- `attempt.stateCode` must match `state.currentState`
- Throws error if state codes don't match

**Example**:
```javascript
const newState = updateProgress(currentState, {
  stateCode: "1.1.1",
  question: { addend1: 23, addend2: 45, correctAnswer: 68 },
  userAnswer: 68,
  correct: true,
  timestamp: Date.now()
});
// newState.currentState === "1.1.2"
```

---

#### `getNextStateCode(currentCode: StateCode): StateCode`

Calculates the next state code in sequence.

**Parameters**:
- `currentCode` (StateCode): Current state code

**Returns**: Next `StateCode` in sequence

**Side Effects**: None (pure function)

**Logic**:
- Increments question number: `1.1.5` → `1.1.6`
- For future: Could handle exercise/world transitions

**Example**:
```javascript
getNextStateCode("1.1.1");  // "1.1.2"
getNextStateCode("1.1.99"); // "1.1.100"
```

---

#### `parseStateCode(code: string): { world: number, exercise: number, question: number } | null`

Parses a state code string into its components.

**Parameters**:
- `code` (string): State code to parse (e.g., "1.1.5")

**Returns**: 
- Object with `world`, `exercise`, `question` numbers if valid
- `null` if format is invalid

**Side Effects**: None (pure function)

**Validation**: Checks format `/^\d+\.\d+\.\d+$/`

**Example**:
```javascript
parseStateCode("1.1.5");  // { world: 1, exercise: 1, question: 5 }
parseStateCode("invalid"); // null
```

---

#### `clearProgress(): boolean`

Clears all saved progress from localStorage.

**Parameters**: None

**Returns**: 
- `true` if clear succeeded
- `false` if operation failed

**Side Effects**: Removes data from `localStorage`

**Use Case**: Reset functionality for testing or starting over

**Example**:
```javascript
clearProgress(); // All progress deleted
```

---

## question-generator.js

**Purpose**: Generates random addition questions with progressive difficulty.

### Functions

#### `generateQuestion(questionNumber: number): AdditionQuestion`

Generates an addition question with difficulty scaled to question number.

**Parameters**:
- `questionNumber` (number): Sequential question number (1-∞)

**Returns**: `AdditionQuestion` object with `addend1`, `addend2`, `correctAnswer`

**Side Effects**: Uses `Math.random()` internally

**Constraints**:
- `addend1` and `addend2` between 1-99
- `correctAnswer` (sum) ≤ 100
- Difficulty increases with question number

**Difficulty scaling**:
- Questions 1-4: Easy (sums 10-40)
- Questions 5-10: Medium (sums 20-70)
- Questions 11+: Hard (sums up to 100)

**Example**:
```javascript
generateQuestion(1);   // { addend1: 5, addend2: 7, correctAnswer: 12 }
generateQuestion(15);  // { addend1: 45, addend2: 55, correctAnswer: 100 }
```

---

#### `validateAnswer(question: AdditionQuestion, userAnswer: number): boolean`

Checks if the user's answer is correct.

**Parameters**:
- `question` (AdditionQuestion): The question being answered
- `userAnswer` (number): Student's submitted answer

**Returns**: `true` if correct, `false` otherwise

**Side Effects**: None (pure function)

**Example**:
```javascript
validateAnswer({ addend1: 23, addend2: 45, correctAnswer: 68 }, 68); // true
validateAnswer({ addend1: 23, addend2: 45, correctAnswer: 68 }, 67); // false
```

---

#### `formatQuestion(question: AdditionQuestion): string`

Formats a question as a readable string.

**Parameters**:
- `question` (AdditionQuestion): Question to format

**Returns**: Formatted string (e.g., "23 + 45 = ?")

**Side Effects**: None (pure function)

**Example**:
```javascript
formatQuestion({ addend1: 23, addend2: 45, correctAnswer: 68 });
// "23 + 45 = ?"
```

---

#### `isDuplicate(question: AdditionQuestion, recentQuestions: AdditionQuestion[]): boolean`

Checks if a question is a duplicate of recent questions.

**Parameters**:
- `question` (AdditionQuestion): Question to check
- `recentQuestions` (AdditionQuestion[]): Array of recent questions (typically last 10)

**Returns**: `true` if duplicate found, `false` otherwise

**Side Effects**: None (pure function)

**Logic**: Compares `addend1` and `addend2` (order-independent: 23+45 equals 45+23)

**Example**:
```javascript
isDuplicate(
  { addend1: 23, addend2: 45, correctAnswer: 68 },
  [{ addend1: 45, addend2: 23, correctAnswer: 68 }]
); // true (order doesn't matter)
```

---

#### `generateUniqueQuestion(questionNumber: number, recentQuestions: AdditionQuestion[]): AdditionQuestion`

Generates a question that's not a duplicate of recent questions.

**Parameters**:
- `questionNumber` (number): Sequential question number
- `recentQuestions` (AdditionQuestion[]): Array of recent questions to avoid

**Returns**: `AdditionQuestion` guaranteed to be unique

**Side Effects**: Uses `Math.random()` internally

**Logic**: Generates questions until non-duplicate found (max 100 attempts, then returns anyway)

**Example**:
```javascript
generateUniqueQuestion(5, [{ addend1: 23, addend2: 45, correctAnswer: 68 }]);
// Returns a question different from 23+45
```

---

## castle-exercise.js

**Purpose**: Coordinates UI interactions and orchestrates the exercise flow.

### Functions

#### `initializeExercise(): void`

Sets up the exercise when the page loads.

**Parameters**: None

**Returns**: `void`

**Side Effects**: 
- Loads state from localStorage
- Attaches event listeners to castle SVG
- Restores UI if progress exists

**Called**: On `DOMContentLoaded`

**Example**:
```javascript
document.addEventListener('DOMContentLoaded', initializeExercise);
```

---

#### `handleCastleClick(event: MouseEvent): void`

Handles click events on the castle SVG.

**Parameters**:
- `event` (MouseEvent): Click event object

**Returns**: `void`

**Side Effects**:
- Shows interaction area
- Displays princess character
- Loads and displays first/current question
- Prevents multiple activations

**Example**:
```javascript
castleElement.addEventListener('click', handleCastleClick);
```

---

#### `showInteractionArea(): void`

Displays the interaction area below the map.

**Parameters**: None

**Returns**: `void`

**Side Effects**: 
- Removes `hidden` class from interaction area div
- Triggers CSS transition/animation

**Example**:
```javascript
showInteractionArea();
```

---

#### `displayQuestion(question: AdditionQuestion, stateCode: StateCode): void`

Renders a question in the UI.

**Parameters**:
- `question` (AdditionQuestion): Question to display
- `stateCode` (StateCode): Current state code for context

**Returns**: `void`

**Side Effects**:
- Updates question text in DOM
- Clears previous answer and feedback
- Focuses answer input
- Uses localized strings from i18n

**Example**:
```javascript
displayQuestion(
  { addend1: 23, addend2: 45, correctAnswer: 68 },
  "1.1.1"
);
```

---

#### `handleSubmit(event: Event): void`

Handles answer submission.

**Parameters**:
- `event` (Event): Submit event from form or button

**Returns**: `void`

**Side Effects**:
- Reads user input
- Validates answer
- Shows feedback
- Updates progress state
- Saves to localStorage
- Loads next question after delay

**Validation**:
- Ensures input is not empty
- Ensures input is numeric

**Example**:
```javascript
submitButton.addEventListener('click', handleSubmit);
```

---

#### `showFeedback(feedback: FeedbackMessage): void`

Displays feedback message to the student.

**Parameters**:
- `feedback` (FeedbackMessage): Feedback to show

**Returns**: `void`

**Side Effects**:
- Updates feedback div in DOM
- Applies CSS class for styling (correct/incorrect)
- Uses localized strings

**Example**:
```javascript
showFeedback({
  type: "correct",
  message: "Excellent work! Let's try another one."
});
```

---

#### `loadNextQuestion(): void`

Loads and displays the next question in sequence.

**Parameters**: None

**Returns**: `void`

**Side Effects**:
- Reads current state from module state
- Generates new question
- Calls `displayQuestion`
- Clears feedback

**Example**:
```javascript
setTimeout(loadNextQuestion, 2000); // After showing feedback
```

---

## Module Dependencies

```
castle-exercise.js
  ├── depends on: exercise-state.js
  │   └── loadState()
  │   └── saveState()
  │   └── updateProgress()
  │   └── getNextStateCode()
  │
  ├── depends on: question-generator.js
  │   └── generateUniqueQuestion()
  │   └── validateAnswer()
  │   └── formatQuestion()
  │
  └── depends on: i18n.js (existing)
      └── getString()

exercise-state.js
  └── no dependencies (pure state management)

question-generator.js
  └── no dependencies (pure question logic)
```

---

## Error Handling

All modules use consistent error handling:

**State operations**:
- Return `null` or `false` for expected failures (no saved state, storage full)
- Throw errors for programmer errors (invalid state codes, validation failures)

**Question generation**:
- Always succeeds (uses fallback after max attempts)
- Never throws errors

**UI operations**:
- Log errors to console
- Show user-friendly messages in UI
- Gracefully degrade (don't break the page)

**Example**:
```javascript
try {
  const state = loadState();
  if (state === null) {
    // Expected: no saved state, start fresh
    state = initializeState("1.1.1");
  }
} catch (error) {
  console.error("Failed to load state:", error);
  // Start fresh with default state
  state = initializeState("1.1.1");
}
```

---

## Type Definitions (JSDoc)

For documentation and IDE support, use JSDoc comments:

```javascript
/**
 * @typedef {Object} StateCode
 * @property {number} world - World number (1-4)
 * @property {number} exercise - Exercise number (1-5)
 * @property {number} question - Question number (1-∞)
 */

/**
 * @typedef {Object} AdditionQuestion
 * @property {number} addend1 - First addend (1-99)
 * @property {number} addend2 - Second addend (1-99)
 * @property {number} correctAnswer - Sum (≤100)
 */

/**
 * @typedef {Object} QuestionAttempt
 * @property {string} stateCode - State code string (e.g., "1.1.1")
 * @property {AdditionQuestion} question - The question asked
 * @property {number} userAnswer - Student's answer
 * @property {boolean} correct - Whether answer was correct
 * @property {number} timestamp - Unix timestamp in ms
 */

/**
 * @typedef {Object} ExerciseProgress
 * @property {string} currentState - Current state code
 * @property {Object.<string, QuestionAttempt>} progress - Map of attempts
 * @property {number} [sessionStart] - Session start timestamp
 * @property {number} lastUpdated - Last update timestamp
 */

/**
 * @typedef {Object} FeedbackMessage
 * @property {'correct'|'incorrect'} type - Feedback type
 * @property {string} message - Localized message
 * @property {number} [correctAnswer] - Correct answer (if incorrect)
 */
```

All function signatures match these type definitions for consistency.
