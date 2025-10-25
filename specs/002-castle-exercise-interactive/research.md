# Research: Interactive Castle Starting Point with Addition Exercises

**Feature**: 002-castle-exercise-interactive  
**Date**: October 25, 2025  
**Phase**: 0 - Research & Technical Decisions

## Research Tasks

### 1. State Code System Design (1.1.1 format)

**Decision**: Hierarchical state code format: `world.exercise.question`

**Rationale**: 
- **Clear hierarchy**: World (1-4) → Exercise (1-5) → Question (1-∞)
- **Human-readable**: Teachers and students can easily understand "1.1.5" means World 1, Exercise 1, Question 5
- **Future-proof**: Supports multiple worlds and exercises per world without restructuring
- **URL/input friendly**: Simple numeric format with dots, easy to type or pass as query parameter

**Format specification**:
- World: 1 = Addition Forest, 2 = Subtraction Mountain, 3 = Multiplication Desert, 4 = Division Ocean
- Exercise: Sequential number within world (1-5 based on treasure map spots)
- Question: Sequential number within exercise (1-∞, unlimited questions for practice)

**Examples**:
- `1.1.1` - Addition Forest, Exercise 1 (Castle), Question 1
- `1.1.7` - Addition Forest, Exercise 1 (Castle), Question 7
- `1.2.1` - Addition Forest, Exercise 2 (future spot), Question 1
- `2.1.1` - Subtraction Mountain, Exercise 1 (future), Question 1

**Alternatives considered**:
- ❌ Sequential integers (1, 2, 3...): Loses semantic meaning, unclear which world/exercise
- ❌ UUID/hash codes: Not human-readable, difficult for teachers/students
- ❌ String keys ("castle_q1"): Harder to parse, doesn't scale to multiple worlds

---

### 2. localStorage Data Structure

**Decision**: Store progress as structured JSON with state codes as keys

**Rationale**:
- Enables quick lookups by state code
- Preserves question history for review
- Compact storage format
- Easy to serialize/deserialize
- Supports future features (statistics, review mode)

**Data structure**:
```javascript
{
  "currentState": "1.1.5",  // Last active state code
  "progress": {
    "1.1.1": {
      "question": "23 + 45",
      "userAnswer": 68,
      "correct": true,
      "timestamp": 1729872000000
    },
    "1.1.2": {
      "question": "17 + 31",
      "userAnswer": 48,
      "correct": true,
      "timestamp": 1729872045000
    }
    // ... more questions
  }
}
```

**Key design decisions**:
- `currentState`: Always points to next unanswered question for resume functionality
- `progress`: Object with state codes as keys for O(1) lookups
- Include timestamp for future analytics/progress tracking features
- Store both question and answer for review functionality (future feature)

**Alternatives considered**:
- ❌ Array of answers: Requires linear search, harder to access specific states
- ❌ Separate keys per question: Clutters localStorage namespace, harder to clear/export
- ❌ IndexedDB: Overkill for simple key-value storage, adds complexity

---

### 3. Question Generation Algorithm (sum ≤ 100)

**Decision**: Weighted random generation with increasing difficulty

**Rationale**:
- Meets requirement: all questions have sum ≤ 100
- Educational value: gradual difficulty progression keeps students engaged
- Variety: avoid repetition within same session
- Simple implementation: no need for question database

**Algorithm**:
```javascript
function generateQuestion(questionNumber) {
  // Start with easier questions, gradually increase difficulty
  const maxSum = Math.min(20 + (questionNumber * 5), 100);
  const minSum = Math.min(10 + (questionNumber * 2), 50);
  
  // Generate target sum in range
  const targetSum = randomInt(minSum, maxSum);
  
  // Split into two addends (avoid 0 and very unbalanced splits)
  const minAddend = Math.max(1, Math.floor(targetSum * 0.2));
  const maxAddend = Math.min(99, Math.floor(targetSum * 0.8));
  const addend1 = randomInt(minAddend, maxAddend);
  const addend2 = targetSum - addend1;
  
  return { addend1, addend2, correctAnswer: targetSum };
}
```

**Difficulty progression**:
- Questions 1-4: sums 10-40 (e.g., 5+7, 12+15)
- Questions 5-10: sums 20-70 (e.g., 23+31, 42+18)
- Questions 11+: sums up to 100 (e.g., 45+55, 67+33)

**Deduplication**: Track recent questions in session, regenerate if duplicate detected (last 10 questions)

**Alternatives considered**:
- ❌ Pure random (1-99 + 1-99): Can generate sums > 100, violates requirement
- ❌ Fixed difficulty: Boring for advanced students, too hard for beginners
- ❌ Pre-defined question bank: Requires maintenance, limits practice quantity

---

### 4. SVG Graphics Best Practices (Castle & Princess)

**Decision**: Inline SVG with CSS styling and child-friendly design

**Rationale**:
- No external image files needed (aligns with project preference)
- Fully stylable with CSS for animations and hover effects
- Scalable without quality loss
- Accessible (can add ARIA labels and titles)
- Consistent with existing treasure map SVG approach

**Castle SVG design**:
- Simple geometric shapes (rectangles for walls, triangles for towers)
- Bright, inviting colors (soft blues, purples, yellows)
- Size: ~80-100px width, positioned at starting location
- Hover effect: slight scale-up (1.1x) with smooth transition
- Click cursor: pointer

**Princess SVG design**:
- Simple character illustration (dress, crown, friendly face)
- Positioned right side of interaction area (per spec requirement)
- Size: ~150-200px height to be prominent but not overwhelming
- Minimal animation: gentle idle animation (subtle movement or sparkle)
- Style: Cute and encouraging, matches Math World aesthetic

**Alternatives considered**:
- ❌ PNG/JPG images: Requires external files, not scalable, harder to style
- ❌ Web fonts/icon fonts: Limited design flexibility, not semantic
- ❌ Canvas rendering: Overkill for static graphics, less accessible

---

### 5. Interaction Area Layout Pattern

**Decision**: Flexbox layout with fixed positioning below map

**Rationale**:
- Clean separation from map (doesn't overlay)
- Responsive width (full container width)
- Easy to align princess (right) and content (left/center)
- Works well on tablet-sized screens (768px+)
- Simple CSS, no JavaScript layout calculations needed

**Layout structure**:
```html
<div class="interaction-area">
  <div class="dialogue-section">
    <p class="princess-message"></p>
    <div class="question-display"></div>
    <div class="answer-section">
      <input type="number" class="answer-input" />
      <button class="submit-button"></button>
    </div>
    <div class="feedback-message"></div>
  </div>
  <div class="princess-character">
    <svg><!-- Princess SVG --></svg>
  </div>
</div>
```

**CSS approach**:
- Flexbox row: `display: flex; justify-content: space-between`
- Dialogue section: `flex: 1`, takes remaining space
- Princess character: `flex: 0 0 200px`, fixed width on right
- Mobile/tablet: Consider stacking on very small screens if needed

**Alternatives considered**:
- ❌ CSS Grid: More complex than needed for this simple two-column layout
- ❌ Absolute positioning: Harder to maintain, less responsive
- ❌ Overlay modal: Spec requires area below map, not overlay

---

### 6. Functional Programming Patterns for JavaScript

**Decision**: Pure functions with explicit data flow, no classes or mutations

**Rationale**:
- Aligns with Constitution Principle I (Functional Programming First)
- Easy to test individual functions
- Clear data dependencies
- Reduces bugs from shared mutable state

**Module structure**:

**exercise-state.js** (State Management):
```javascript
// Pure functions for state operations
export const loadState = () => { ... }
export const saveState = (state) => { ... }
export const updateProgress = (state, stateCode, questionData) => { ... }
export const getCurrentStateCode = (state) => { ... }
export const getNextStateCode = (stateCode) => { ... }
```

**question-generator.js** (Question Logic):
```javascript
// Pure functions for question generation
export const generateQuestion = (questionNumber) => { ... }
export const validateAnswer = (question, userAnswer) => { ... }
export const formatQuestion = (question) => { ... }
export const isDuplicate = (question, recentQuestions) => { ... }
```

**castle-exercise.js** (UI Coordination):
```javascript
// Impure functions (DOM interactions), but composed from pure functions
export const initializeExercise = () => { ... }
export const showInteractionArea = () => { ... }
export const displayQuestion = (question) => { ... }
export const handleSubmit = (userAnswer) => { ... }
export const showFeedback = (isCorrect, correctAnswer) => { ... }
```

**Key patterns**:
- **No classes**: Use modules with exported functions
- **No mutations**: Return new objects instead of modifying existing ones
- **Explicit dependencies**: Pass all data as parameters, no hidden state
- **Small functions**: Each function does one thing well
- **Composition**: Build complex behavior from simple functions

**Alternatives considered**:
- ❌ OOP with classes: Violates Constitution Principle I
- ❌ Global mutable state: Hard to test, prone to bugs
- ❌ Mixed paradigm: Confusing, inconsistent codebase

---

### 7. Localization Integration with i18n.js

**Decision**: Extend existing i18n.js system with exercise-specific strings

**Rationale**:
- Reuses existing localization infrastructure
- Consistent with rest of Math World site
- Meets Constitution Principle IV requirement
- Already has English and Swedish support

**New localization keys needed**:

**en.json additions**:
```json
{
  "additionForest": {
    "exercise1": {
      "princessGreeting": "Please help me, I wanted to sneak out of my tower and go exploring the forest, but my magical door wants me to answer some riddles first.",
      "questionPrompt": "What is {addend1} + {addend2}?",
      "answerPlaceholder": "Enter your answer",
      "submitButton": "Submit",
      "correctFeedback": "Excellent work! Let's try another one.",
      "incorrectFeedback": "Not quite. The correct answer is {correctAnswer}. Let's keep trying!",
      "inputLabel": "Your answer"
    }
  }
}
```

**sv.json additions** (Swedish translations needed):
```json
{
  "additionForest": {
    "exercise1": {
      "princessGreeting": "Snälla hjälp mig, jag ville smyga ut från mitt torn och utforska skogen, men min magiska dörr vill att jag svarar på några gåtor först.",
      "questionPrompt": "Vad är {addend1} + {addend2}?",
      "answerPlaceholder": "Skriv ditt svar",
      "submitButton": "Skicka",
      "correctFeedback": "Utmärkt jobbat! Låt oss prova en till.",
      "incorrectFeedback": "Inte riktigt. Det rätta svaret är {correctAnswer}. Låt oss fortsätta försöka!",
      "inputLabel": "Ditt svar"
    }
  }
}
```

**Integration approach**:
- Use existing `data-i18n` attributes for static elements
- Use JavaScript string replacement for dynamic content (question numbers)
- Call i18n functions for runtime string retrieval

**Alternatives considered**:
- ❌ Hardcoded English strings: Violates Constitution Principle IV
- ❌ Separate localization system: Duplicates existing infrastructure
- ❌ Inline translations in JS: Harder to manage, less maintainable

---

## Summary of Technical Decisions

| Aspect | Decision | Key Benefit |
|--------|----------|-------------|
| State Code Format | `world.exercise.question` (e.g., 1.1.5) | Human-readable, hierarchical, future-proof |
| Storage | localStorage with JSON structure | Simple, persistent, supports resume functionality |
| Question Algorithm | Weighted random with progression | Educational progression, meets sum ≤100 requirement |
| Graphics | Inline SVG with CSS styling | Scalable, stylable, consistent with project |
| Layout | Flexbox with fixed positioning | Responsive, clean separation from map |
| Code Paradigm | Functional programming with pure functions | Testable, maintainable, meets constitution |
| Localization | Extend existing i18n.js system | Consistent, meets constitution requirement |

All decisions align with constitutional principles and feature requirements. Ready to proceed to Phase 1 (Design & Contracts).
