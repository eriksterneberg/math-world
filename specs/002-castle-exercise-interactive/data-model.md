# Data Model: Interactive Castle Starting Point with Addition Exercises

**Feature**: 002-castle-exercise-interactive  
**Date**: October 25, 2025  
**Phase**: 1 - Design & Contracts

## Entities

### 1. StateCode

Represents the hierarchical position in the learning journey.

**Format**: `world.exercise.question`

**Fields**:
- `world` (integer, 1-4): Identifies the mathematical operation world
  - 1 = Addition Forest
  - 2 = Subtraction Mountain
  - 3 = Multiplication Desert
  - 4 = Division Ocean
- `exercise` (integer, 1-5): Identifies the exercise within the world (corresponds to treasure map spots)
- `question` (integer, 1-∞): Sequential question number within the exercise

**Validation Rules**:
- All components must be positive integers
- Format: `/^\d+\.\d+\.\d+$/`
- World must be 1-4 (for current scope)
- Exercise must be 1-5 (based on 5 spots on treasure map)
- Question has no upper limit (unlimited practice)

**State Transitions**:
```
1.1.1 → 1.1.2 → 1.1.3 → ... (sequential within exercise)
1.1.N → 1.2.1 (transition to next exercise, future feature)
1.E.Q → 2.1.1 (transition to next world, future feature)
```

**Examples**:
- `1.1.1` - First question of castle exercise
- `1.1.7` - Seventh question of castle exercise
- `1.1.100` - One hundredth question (valid, unlimited practice)

---

### 2. AdditionQuestion

Represents a single addition math problem.

**Fields**:
- `addend1` (integer, 1-99): First number in the addition
- `addend2` (integer, 1-99): Second number in the addition
- `correctAnswer` (integer, 2-100): Sum of addend1 and addend2

**Validation Rules**:
- `addend1 >= 1 AND addend1 <= 99`
- `addend2 >= 1 AND addend2 <= 99`
- `correctAnswer = addend1 + addend2`
- `correctAnswer <= 100` (critical requirement from spec)

**Derived Properties**:
- `formattedQuestion`: String representation, e.g., "23 + 45 = ?"
- `difficulty`: Inferred from correctAnswer value (10-30: easy, 31-70: medium, 71-100: hard)

**Example**:
```javascript
{
  addend1: 23,
  addend2: 45,
  correctAnswer: 68
}
```

---

### 3. QuestionAttempt

Records a student's attempt at answering a question.

**Fields**:
- `stateCode` (StateCode): Which question was attempted
- `question` (AdditionQuestion): The question that was asked
- `userAnswer` (integer): Student's submitted answer
- `correct` (boolean): Whether the answer was correct
- `timestamp` (integer): Unix timestamp in milliseconds when answered

**Validation Rules**:
- `stateCode` must be valid StateCode format
- `question` must be valid AdditionQuestion
- `userAnswer` must be an integer
- `correct` must equal `(userAnswer === question.correctAnswer)`
- `timestamp` must be positive integer

**Relationships**:
- Links to StateCode (identifies position in learning journey)
- Contains AdditionQuestion (preserves what was asked)

**Example**:
```javascript
{
  stateCode: "1.1.1",
  question: {
    addend1: 23,
    addend2: 45,
    correctAnswer: 68
  },
  userAnswer: 68,
  correct: true,
  timestamp: 1729872000000
}
```

---

### 4. ExerciseProgress

Stores the complete progress state for a student's exercise session.

**Fields**:
- `currentState` (StateCode): The next question to be answered (resume point)
- `progress` (Object<StateCode, QuestionAttempt>): Map of completed attempts keyed by state code
- `sessionStart` (integer, optional): Unix timestamp when session began
- `lastUpdated` (integer): Unix timestamp of most recent update

**Validation Rules**:
- `currentState` must be valid StateCode
- `progress` object keys must be valid StateCodes
- `progress` object values must be valid QuestionAttempts
- `currentState` should not exist as a key in `progress` (it's the next unanswered question)
- `lastUpdated` must be positive integer
- If `sessionStart` exists, it must be <= `lastUpdated`

**State Transitions**:
When a question is answered:
1. Create QuestionAttempt with current state
2. Add to `progress` object with `currentState` as key
3. Increment `currentState` to next question (e.g., 1.1.1 → 1.1.2)
4. Update `lastUpdated` timestamp
5. Persist to localStorage

**Relationships**:
- Contains multiple QuestionAttempts (one per answered question)
- Tracks current position via StateCode

**Example**:
```javascript
{
  currentState: "1.1.3",
  progress: {
    "1.1.1": {
      stateCode: "1.1.1",
      question: { addend1: 23, addend2: 45, correctAnswer: 68 },
      userAnswer: 68,
      correct: true,
      timestamp: 1729872000000
    },
    "1.1.2": {
      stateCode: "1.1.2",
      question: { addend1: 17, addend2: 31, correctAnswer: 48 },
      userAnswer: 48,
      correct: true,
      timestamp: 1729872045000
    }
  },
  sessionStart: 1729871950000,
  lastUpdated: 1729872045000
}
```

---

### 5. FeedbackMessage

Represents user-facing feedback after submitting an answer.

**Fields**:
- `type` (enum: "correct" | "incorrect"): Type of feedback
- `message` (string): Localized feedback text
- `correctAnswer` (integer, optional): Shown only for incorrect answers

**Validation Rules**:
- `type` must be either "correct" or "incorrect"
- `message` must be non-empty string
- `correctAnswer` must be provided if and only if `type === "incorrect"`

**Localization**:
- `message` comes from localization files (`en.json`, `sv.json`)
- Uses keys: `additionForest.exercise1.correctFeedback` or `additionForest.exercise1.incorrectFeedback`

**Example (Correct)**:
```javascript
{
  type: "correct",
  message: "Excellent work! Let's try another one."
}
```

**Example (Incorrect)**:
```javascript
{
  type: "incorrect",
  message: "Not quite. The correct answer is 48. Let's keep trying!",
  correctAnswer: 48
}
```

---

## Entity Relationships

```
ExerciseProgress
  ├── currentState: StateCode
  └── progress: Map<StateCode, QuestionAttempt>
                      └── QuestionAttempt
                            ├── stateCode: StateCode
                            ├── question: AdditionQuestion
                            ├── userAnswer: integer
                            ├── correct: boolean
                            └── timestamp: integer
```

**Flow**:
1. System loads ExerciseProgress from localStorage
2. Uses `currentState` to determine next question
3. Generates AdditionQuestion for current state
4. Student submits answer, creates QuestionAttempt
5. QuestionAttempt added to progress map
6. `currentState` incremented to next StateCode
7. ExerciseProgress saved to localStorage

---

## Storage Schema (localStorage)

**Key**: `mathworld.additionForest.exercise1`

**Value**: JSON-serialized ExerciseProgress object

**Example stored data**:
```json
{
  "currentState": "1.1.3",
  "progress": {
    "1.1.1": {
      "stateCode": "1.1.1",
      "question": {
        "addend1": 23,
        "addend2": 45,
        "correctAnswer": 68
      },
      "userAnswer": 68,
      "correct": true,
      "timestamp": 1729872000000
    },
    "1.1.2": {
      "stateCode": "1.1.2",
      "question": {
        "addend1": 17,
        "addend2": 31,
        "correctAnswer": 48
      },
      "userAnswer": 48,
      "correct": true,
      "timestamp": 1729872045000
    }
  },
  "sessionStart": 1729871950000,
  "lastUpdated": 1729872045000
}
```

**Storage operations**:
- **Load**: `JSON.parse(localStorage.getItem('mathworld.additionForest.exercise1'))`
- **Save**: `localStorage.setItem('mathworld.additionForest.exercise1', JSON.stringify(progressObject))`
- **Clear**: `localStorage.removeItem('mathworld.additionForest.exercise1')` (for reset functionality)

---

## Validation Summary

| Entity | Key Validations |
|--------|----------------|
| StateCode | Format `/^\d+\.\d+\.\d+$/`, world 1-4, exercise 1-5, question ≥1 |
| AdditionQuestion | addend1/addend2 1-99, correctAnswer ≤100 |
| QuestionAttempt | Valid StateCode and AdditionQuestion, correct = (userAnswer === correctAnswer) |
| ExerciseProgress | currentState not in progress keys, lastUpdated ≥ sessionStart |
| FeedbackMessage | type in enum, message non-empty, correctAnswer only if incorrect |

All entities designed to support functional programming paradigm with immutable updates and clear validation boundaries.
