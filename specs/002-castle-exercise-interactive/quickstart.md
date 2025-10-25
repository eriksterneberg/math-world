# Quickstart: Interactive Castle Starting Point with Addition Exercises

**Feature**: 002-castle-exercise-interactive  
**Date**: October 25, 2025  
**Estimated Implementation Time**: 6-8 hours

This guide walks you through implementing the castle exercise feature from scratch.

---

## Prerequisites

- Modern text editor with JavaScript support
- Web browser with developer tools (Chrome, Firefox, Safari, or Edge)
- Basic understanding of HTML, CSS, and JavaScript (ES6+)
- Familiarity with SVG graphics
- Local development server (optional but recommended, e.g., `python -m http.server`)

---

## Implementation Sequence

### Phase 1: HTML Structure (30 minutes)

**Goal**: Add castle SVG and interaction area to the Addition Forest map page.

1. **Open file**: `frontend/worlds/addition-forest-map.html`

2. **Remove existing UI elements** (as specified in FR-001):
   - Remove the `<header>` element with map title and subtitle
   - Remove the `<nav>` element with "Back to home" link
   - Keep only the treasure map SVG container

3. **Add castle SVG to the map**:
   - Inside the `<svg>` element, add a castle graphic at the starting position
   - Position it at coordinates matching the first spot (around 150, 450)
   - Make it clickable with `class="castle-start"` and appropriate cursor styling
   
   ```html
   <!-- Add inside <svg> after existing path and spots -->
   <g class="castle-start" transform="translate(150, 450)" style="cursor: pointer;">
     <!-- Simple castle shape with rectangles and triangles -->
     <rect x="-30" y="-40" width="60" height="50" fill="#9575CD" stroke="#5E35B1" stroke-width="2"/>
     <rect x="-35" y="-45" width="15" height="10" fill="#7E57C2"/>
     <rect x="20" y="-45" width="15" height="10" fill="#7E57C2"/>
     <polygon points="0,-50 -40,-40 40,-40" fill="#5E35B1"/>
     <rect x="-10" y="-20" width="20" height="30" fill="#FDD835" stroke="#F57F17" stroke-width="1"/>
     <circle cx="0" cy="-35" r="3" fill="#FFD54F"/>
   </g>
   ```

4. **Add interaction area below the map**:
   - After the closing `</svg>` tag, add the interaction area structure:
   
   ```html
   <!-- Interaction Area (hidden by default) -->
   <div class="interaction-area hidden" id="interaction-area">
     <div class="dialogue-section">
       <p class="princess-message" data-i18n="additionForest.exercise1.princessGreeting"></p>
       <div class="question-display" id="question-display"></div>
       <div class="answer-section">
         <label for="answer-input" class="sr-only" data-i18n="additionForest.exercise1.inputLabel"></label>
         <input 
           type="number" 
           id="answer-input" 
           class="answer-input" 
           data-i18n-placeholder="additionForest.exercise1.answerPlaceholder"
         />
         <button id="submit-button" class="submit-button" data-i18n="additionForest.exercise1.submitButton"></button>
       </div>
       <div class="feedback-message" id="feedback-message"></div>
     </div>
     <div class="princess-character">
       <!-- Simple princess SVG -->
       <svg width="180" height="200" viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg">
         <!-- Princess illustration (simplified) -->
         <circle cx="90" cy="50" r="30" fill="#FFEAA7" stroke="#DFE6E9" stroke-width="2"/>
         <ellipse cx="85" cy="48" rx="3" ry="5" fill="#2D3436"/>
         <ellipse cx="95" cy="48" rx="3" ry="5" fill="#2D3436"/>
         <path d="M 85 58 Q 90 62, 95 58" stroke="#D63031" stroke-width="2" fill="none"/>
         <polygon points="90,20 85,30 95,30" fill="#FFD700" stroke="#F39C12" stroke-width="1"/>
         <ellipse cx="90" cy="120" rx="35" ry="60" fill="#E84393" stroke="#FD79A8" stroke-width="2"/>
         <rect x="60" y="80" width="20" height="50" fill="#FFEAA7"/>
         <rect x="100" y="80" width="20" height="50" fill="#FFEAA7"/>
       </svg>
     </div>
   </div>
   ```

5. **Link new JavaScript modules**:
   - Add script tags before closing `</body>`:
   
   ```html
   <script type="module" src="../scripts/exercise-state.js"></script>
   <script type="module" src="../scripts/question-generator.js"></script>
   <script type="module" src="../scripts/castle-exercise.js"></script>
   ```

6. **Link new CSS**:
   - Add in `<head>` section:
   
   ```html
   <link rel="stylesheet" href="../styles/exercise.css">
   ```

**Checkpoint**: Open the page in browser - castle should be visible on map, interaction area hidden.

---

### Phase 2: CSS Styling (45 minutes)

**Goal**: Style the castle, interaction area, and princess character.

1. **Create file**: `frontend/styles/exercise.css`

2. **Add interaction area styles**:
   ```css
   .interaction-area {
     display: flex;
     justify-content: space-between;
     align-items: flex-start;
     gap: 2rem;
     margin-top: 2rem;
     padding: 2rem;
     background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
     border-radius: 12px;
     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
     transition: opacity 0.3s ease, transform 0.3s ease;
   }
   
   .interaction-area.hidden {
     display: none;
   }
   
   .dialogue-section {
     flex: 1;
     min-width: 0;
   }
   
   .princess-character {
     flex: 0 0 200px;
     text-align: center;
   }
   ```

3. **Add castle hover effects**:
   ```css
   .castle-start {
     transition: transform 0.2s ease;
   }
   
   .castle-start:hover {
     transform: scale(1.1);
   }
   ```

4. **Add princess message styles**:
   ```css
   .princess-message {
     font-size: 1.1rem;
     line-height: 1.6;
     color: #2D3436;
     margin-bottom: 1.5rem;
     padding: 1rem;
     background: white;
     border-radius: 8px;
     border-left: 4px solid #E84393;
   }
   ```

5. **Add question display styles**:
   ```css
   .question-display {
     font-size: 2rem;
     font-weight: bold;
     color: #6C5CE7;
     text-align: center;
     margin: 1.5rem 0;
     padding: 1rem;
     background: white;
     border-radius: 8px;
   }
   ```

6. **Add input and button styles**:
   ```css
   .answer-section {
     display: flex;
     gap: 1rem;
     justify-content: center;
     align-items: center;
     margin: 1.5rem 0;
   }
   
   .answer-input {
     width: 150px;
     font-size: 1.5rem;
     padding: 0.5rem 1rem;
     border: 2px solid #6C5CE7;
     border-radius: 8px;
     text-align: center;
     transition: border-color 0.2s ease;
   }
   
   .answer-input:focus {
     outline: none;
     border-color: #A29BFE;
     box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
   }
   
   .submit-button {
     padding: 0.5rem 2rem;
     font-size: 1.2rem;
     font-weight: bold;
     color: white;
     background: #00B894;
     border: none;
     border-radius: 8px;
     cursor: pointer;
     transition: background 0.2s ease, transform 0.1s ease;
   }
   
   .submit-button:hover {
     background: #00A180;
     transform: translateY(-2px);
   }
   
   .submit-button:active {
     transform: translateY(0);
   }
   ```

7. **Add feedback styles**:
   ```css
   .feedback-message {
     font-size: 1.1rem;
     padding: 1rem;
     margin-top: 1rem;
     border-radius: 8px;
     text-align: center;
     transition: opacity 0.3s ease;
   }
   
   .feedback-message.correct {
     background: #D1F2EB;
     color: #00B894;
     border: 2px solid #00B894;
   }
   
   .feedback-message.incorrect {
     background: #FADBD8;
     color: #E74C3C;
     border: 2px solid #E74C3C;
   }
   
   .feedback-message:empty {
     display: none;
   }
   ```

**Checkpoint**: Manually remove `hidden` class from interaction area in browser dev tools - should see styled layout with princess.

---

### Phase 3: Localization Strings (15 minutes)

**Goal**: Add all UI strings to localization files.

1. **Update**: `frontend/locales/en.json`
   - Add under `additionForest` key:
   ```json
   "exercise1": {
     "princessGreeting": "Please help me, I wanted to sneak out of my tower and go exploring the forest, but my magical door wants me to answer some riddles first.",
     "questionPrompt": "What is {addend1} + {addend2}?",
     "answerPlaceholder": "Enter your answer",
     "submitButton": "Submit",
     "correctFeedback": "Excellent work! Let's try another one.",
     "incorrectFeedback": "Not quite. The correct answer is {correctAnswer}. Let's keep trying!",
     "inputLabel": "Your answer"
   }
   ```

2. **Update**: `frontend/locales/sv.json`
   - Add Swedish translations (same structure):
   ```json
   "exercise1": {
     "princessGreeting": "Snälla hjälp mig, jag ville smyga ut från mitt torn och utforska skogen, men min magiska dörr vill att jag svarar på några gåtor först.",
     "questionPrompt": "Vad är {addend1} + {addend2}?",
     "answerPlaceholder": "Skriv ditt svar",
     "submitButton": "Skicka",
     "correctFeedback": "Utmärkt jobbat! Låt oss prova en till.",
     "incorrectFeedback": "Inte riktigt. Det rätta svaret är {correctAnswer}. Låt oss fortsätta försöka!",
     "inputLabel": "Ditt svar"
   }
   ```

**Checkpoint**: Check that existing i18n.js loads these strings (test by logging to console).

---

### Phase 4: State Management Module (60 minutes)

**Goal**: Implement localStorage-based state persistence.

1. **Create file**: `frontend/scripts/exercise-state.js`

2. **Add constants and storage key**:
   ```javascript
   const STORAGE_KEY = 'mathworld.additionForest.exercise1';
   ```

3. **Implement core functions** (see contracts/module-interfaces.md for full signatures):
   - `loadState()`
   - `saveState(state)`
   - `initializeState(startingCode)`
   - `updateProgress(state, attempt)`
   - `getNextStateCode(currentCode)`
   - `parseStateCode(code)`
   - `clearProgress()`

4. **Example implementation**:
   ```javascript
   export function loadState() {
     try {
       const stored = localStorage.getItem(STORAGE_KEY);
       if (!stored) return null;
       
       const state = JSON.parse(stored);
       // Validate structure
       if (!state.currentState || !state.progress) return null;
       
       return state;
     } catch (error) {
       console.error('Failed to load state:', error);
       return null;
     }
   }
   
   export function saveState(state) {
     try {
       state.lastUpdated = Date.now();
       localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
       return true;
     } catch (error) {
       console.error('Failed to save state:', error);
       return false;
     }
   }
   
   export function initializeState(startingCode) {
     return {
       currentState: startingCode,
       progress: {},
       sessionStart: Date.now(),
       lastUpdated: Date.now()
     };
   }
   
   export function updateProgress(state, attempt) {
     const newState = {
       ...state,
       progress: {
         ...state.progress,
         [attempt.stateCode]: attempt
       },
       currentState: getNextStateCode(attempt.stateCode),
       lastUpdated: Date.now()
     };
     return newState;
   }
   
   export function getNextStateCode(currentCode) {
     const parts = parseStateCode(currentCode);
     if (!parts) throw new Error('Invalid state code');
     
     return `${parts.world}.${parts.exercise}.${parts.question + 1}`;
   }
   
   export function parseStateCode(code) {
     const match = code.match(/^(\d+)\.(\d+)\.(\d+)$/);
     if (!match) return null;
     
     return {
       world: parseInt(match[1]),
       exercise: parseInt(match[2]),
       question: parseInt(match[3])
     };
   }
   
   export function clearProgress() {
     try {
       localStorage.removeItem(STORAGE_KEY);
       return true;
     } catch (error) {
       console.error('Failed to clear progress:', error);
       return false;
     }
   }
   ```

**Checkpoint**: Test in browser console:
```javascript
import { initializeState, saveState, loadState } from './exercise-state.js';
const state = initializeState('1.1.1');
saveState(state);
console.log(loadState()); // Should show saved state
```

---

### Phase 5: Question Generator Module (60 minutes)

**Goal**: Generate random addition questions with progressive difficulty.

1. **Create file**: `frontend/scripts/question-generator.js`

2. **Implement helper functions**:
   ```javascript
   function randomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
   }
   ```

3. **Implement core functions** (see contracts/module-interfaces.md):
   - `generateQuestion(questionNumber)`
   - `validateAnswer(question, userAnswer)`
   - `formatQuestion(question)`
   - `isDuplicate(question, recentQuestions)`
   - `generateUniqueQuestion(questionNumber, recentQuestions)`

4. **Example implementation**:
   ```javascript
   export function generateQuestion(questionNumber) {
     // Progressive difficulty
     const maxSum = Math.min(20 + (questionNumber * 5), 100);
     const minSum = Math.min(10 + (questionNumber * 2), 50);
     
     const targetSum = randomInt(minSum, maxSum);
     
     // Split into two addends
     const minAddend = Math.max(1, Math.floor(targetSum * 0.2));
     const maxAddend = Math.min(99, Math.floor(targetSum * 0.8));
     const addend1 = randomInt(minAddend, maxAddend);
     const addend2 = targetSum - addend1;
     
     return {
       addend1,
       addend2,
       correctAnswer: targetSum
     };
   }
   
   export function validateAnswer(question, userAnswer) {
     return userAnswer === question.correctAnswer;
   }
   
   export function formatQuestion(question) {
     return `${question.addend1} + ${question.addend2} = ?`;
   }
   
   export function isDuplicate(question, recentQuestions) {
     return recentQuestions.some(recent => 
       (recent.addend1 === question.addend1 && recent.addend2 === question.addend2) ||
       (recent.addend1 === question.addend2 && recent.addend2 === question.addend1)
     );
   }
   
   export function generateUniqueQuestion(questionNumber, recentQuestions) {
     let attempts = 0;
     let question;
     
     do {
       question = generateQuestion(questionNumber);
       attempts++;
     } while (isDuplicate(question, recentQuestions) && attempts < 100);
     
     return question;
   }
   ```

**Checkpoint**: Test in browser console:
```javascript
import { generateQuestion, validateAnswer } from './question-generator.js';
const q = generateQuestion(1);
console.log(q); // Should show valid question with sum ≤100
console.log(validateAnswer(q, q.correctAnswer)); // true
```

---

### Phase 6: Main Exercise Logic (90 minutes)

**Goal**: Coordinate UI interactions and exercise flow.

1. **Create file**: `frontend/scripts/castle-exercise.js`

2. **Import dependencies**:
   ```javascript
   import * as State from './exercise-state.js';
   import * as Questions from './question-generator.js';
   ```

3. **Module state** (keep track of current session):
   ```javascript
   let currentState = null;
   let currentQuestion = null;
   let recentQuestions = [];
   ```

4. **Implement initialization**:
   ```javascript
   export function initializeExercise() {
     // Load or create state
     currentState = State.loadState();
     if (!currentState) {
       currentState = State.initializeState('1.1.1');
     }
     
     // Attach castle click listener
     const castle = document.querySelector('.castle-start');
     if (castle) {
       castle.addEventListener('click', handleCastleClick);
     }
     
     // If progress exists, could optionally resume
     // For now, always wait for castle click
   }
   
   document.addEventListener('DOMContentLoaded', initializeExercise);
   ```

5. **Implement castle click handler**:
   ```javascript
   export function handleCastleClick(event) {
     showInteractionArea();
     loadNextQuestion();
     
     // Remove click listener to prevent multiple activations
     event.currentTarget.removeEventListener('click', handleCastleClick);
   }
   ```

6. **Implement UI functions**:
   ```javascript
   export function showInteractionArea() {
     const area = document.getElementById('interaction-area');
     if (area) {
       area.classList.remove('hidden');
     }
   }
   
   export function displayQuestion(question, stateCode) {
     currentQuestion = question;
     
     const display = document.getElementById('question-display');
     if (display) {
       display.textContent = Questions.formatQuestion(question);
     }
     
     const input = document.getElementById('answer-input');
     if (input) {
       input.value = '';
       input.focus();
     }
     
     const feedback = document.getElementById('feedback-message');
     if (feedback) {
       feedback.textContent = '';
       feedback.className = 'feedback-message';
     }
   }
   
   export function showFeedback(feedback) {
     const feedbackEl = document.getElementById('feedback-message');
     if (feedbackEl) {
       feedbackEl.textContent = feedback.message;
       feedbackEl.className = `feedback-message ${feedback.type}`;
     }
   }
   
   export function loadNextQuestion() {
     const parsed = State.parseStateCode(currentState.currentState);
     const question = Questions.generateUniqueQuestion(
       parsed.question,
       recentQuestions
     );
     
     recentQuestions.push(question);
     if (recentQuestions.length > 10) {
       recentQuestions.shift(); // Keep only last 10
     }
     
     displayQuestion(question, currentState.currentState);
   }
   ```

7. **Implement submit handler**:
   ```javascript
   export function handleSubmit(event) {
     event.preventDefault();
     
     const input = document.getElementById('answer-input');
     const userAnswer = parseInt(input.value);
     
     if (isNaN(userAnswer)) {
       alert('Please enter a number');
       return;
     }
     
     const isCorrect = Questions.validateAnswer(currentQuestion, userAnswer);
     
     // Create attempt record
     const attempt = {
       stateCode: currentState.currentState,
       question: currentQuestion,
       userAnswer,
       correct: isCorrect,
       timestamp: Date.now()
     };
     
     // Update state
     currentState = State.updateProgress(currentState, attempt);
     State.saveState(currentState);
     
     // Show feedback
     const feedback = isCorrect
       ? { type: 'correct', message: 'Excellent work! Let\'s try another one.' }
       : { 
           type: 'incorrect', 
           message: `Not quite. The correct answer is ${currentQuestion.correctAnswer}. Let's keep trying!`,
           correctAnswer: currentQuestion.correctAnswer
         };
     
     showFeedback(feedback);
     
     // Load next question after delay
     setTimeout(loadNextQuestion, 2000);
   }
   ```

8. **Attach submit listener**:
   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     const submitBtn = document.getElementById('submit-button');
     if (submitBtn) {
       submitBtn.addEventListener('click', handleSubmit);
     }
     
     const input = document.getElementById('answer-input');
     if (input) {
       input.addEventListener('keypress', (e) => {
         if (e.key === 'Enter') {
           handleSubmit(e);
         }
       });
     }
   });
   ```

**Checkpoint**: Full end-to-end test:
1. Open page in browser
2. Click castle
3. See interaction area with princess and question
4. Enter answer and submit
5. See feedback
6. See next question appear
7. Reload page and verify progress saved

---

### Phase 7: Localization Integration (30 minutes)

**Goal**: Replace hardcoded strings with localized versions.

1. **Update `castle-exercise.js`** to use i18n strings:
   ```javascript
   // Assuming i18n.js exports a function like getString(key, params)
   import { getString } from './i18n.js';
   
   // In showFeedback:
   const feedback = isCorrect
     ? { 
         type: 'correct', 
         message: getString('additionForest.exercise1.correctFeedback') 
       }
     : { 
         type: 'incorrect', 
         message: getString('additionForest.exercise1.incorrectFeedback', {
           correctAnswer: currentQuestion.correctAnswer
         }),
         correctAnswer: currentQuestion.correctAnswer
       };
   ```

2. **Verify all `data-i18n` attributes** are processed by existing i18n.js on page load

**Checkpoint**: Test with language switcher (if available) or manually change locale to verify translations.

---

### Phase 8: Testing & Refinement (60 minutes)

**Goal**: Test all scenarios and polish the experience.

1. **Test basic flow**:
   - [ ] Castle is visible and clickable
   - [ ] Interaction area appears on click
   - [ ] Princess character is visible
   - [ ] First question appears
   - [ ] Can enter numeric answer
   - [ ] Submit button works
   - [ ] Correct feedback shows for correct answer
   - [ ] Incorrect feedback shows for wrong answer
   - [ ] Next question appears after feedback

2. **Test progress persistence**:
   - [ ] Answer several questions
   - [ ] Reload page
   - [ ] Click castle again
   - [ ] Verify continues from where left off (check currentState in console)

3. **Test state code system**:
   - [ ] Open dev tools, check localStorage
   - [ ] Verify state codes increment correctly (1.1.1 → 1.1.2 → 1.1.3)
   - [ ] Verify all data saved properly

4. **Test edge cases**:
   - [ ] Try to submit empty answer
   - [ ] Try to submit non-numeric answer
   - [ ] Click castle multiple times quickly
   - [ ] Test on minimum width (768px)

5. **Polish**:
   - Add any missing CSS transitions
   - Ensure princess SVG looks cute and inviting
   - Check color contrast for accessibility
   - Test keyboard navigation (Tab, Enter)

**Checkpoint**: All tests pass, feature works smoothly.

---

## Verification Checklist

Before considering the feature complete:

- [ ] Castle SVG is visible and styled appropriately
- [ ] Castle responds to hover (scale effect)
- [ ] Click on castle shows interaction area
- [ ] Princess character is visible and cute
- [ ] Princess greeting message displays correctly
- [ ] Questions are generated with sum ≤ 100
- [ ] Questions increase in difficulty over time
- [ ] No duplicate questions in recent history
- [ ] Input field accepts numeric input only
- [ ] Submit button is styled and clickable
- [ ] Correct answers show positive feedback
- [ ] Incorrect answers show correct answer in feedback
- [ ] Next question loads automatically after feedback
- [ ] Progress saves to localStorage
- [ ] Page reload restores progress
- [ ] State codes increment correctly (1.1.1 → 1.1.2 → ...)
- [ ] All UI strings are localized (en.json and sv.json)
- [ ] No console errors
- [ ] Works on Chrome, Firefox, Safari, Edge
- [ ] Responsive on screens ≥768px width
- [ ] Keyboard navigation works (Tab, Enter)

---

## Troubleshooting

**Castle doesn't appear**:
- Check SVG syntax in HTML
- Verify transform translate values position it correctly
- Check browser console for errors

**Interaction area doesn't show**:
- Verify `hidden` class is removed on click
- Check CSS display property
- Verify JavaScript event listener is attached

**Questions always duplicate**:
- Check `isDuplicate` function logic
- Verify `recentQuestions` array is maintained correctly
- Increase max attempts in `generateUniqueQuestion`

**Progress doesn't save**:
- Check browser console for localStorage errors
- Verify localStorage is enabled in browser
- Check JSON serialization doesn't throw errors

**Localization strings not showing**:
- Verify i18n.js is loaded before castle-exercise.js
- Check that keys in JSON match `data-i18n` attributes
- Verify `getString` function works correctly

---

## Next Steps

After completing this feature:

1. **Test with real students** - Get feedback on difficulty progression
2. **Add exercise completion** - Define when castle exercise is "complete"
3. **Unlock second spot** - Enable next treasure map location
4. **Add state code input** - Allow users to jump to specific questions (1.1.5)
5. **Statistics dashboard** - Show progress, accuracy, time spent

---

## Estimated Time Breakdown

| Phase | Task | Time |
|-------|------|------|
| 1 | HTML Structure | 30 min |
| 2 | CSS Styling | 45 min |
| 3 | Localization Strings | 15 min |
| 4 | State Management | 60 min |
| 5 | Question Generator | 60 min |
| 6 | Main Exercise Logic | 90 min |
| 7 | Localization Integration | 30 min |
| 8 | Testing & Refinement | 60 min |
| **Total** | | **6.5 hours** |

Add 1-2 hours buffer for unexpected issues = **8 hours total**.
