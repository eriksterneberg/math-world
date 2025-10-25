/**
 * Castle Exercise UI Coordination Module
 * Handles user interactions and coordinates between state management and question generation
 * Feature: 002-castle-exercise-interactive
 * 
 * @module castle-exercise
 */

import * as ExerciseState from './exercise-state.js';
import * as QuestionGenerator from './question-generator.js';

// Configuration
const MAX_QUESTIONS = 10; // Total number of questions in this exercise

// DOM element references (initialized on DOMContentLoaded)
let castleSpot = null;
let interactionArea = null;
let questionText = null;
let answerInput = null;
let submitButton = null;
let feedbackMessage = null;

// Current exercise state
let currentState = null;
let currentQuestion = null;

/**
 * Initializes the exercise by loading saved state or creating new state
 * Sets up the initial question and UI
 * 
 * @returns {void}
 */
function initializeExercise() {
  console.log('🔧 Initializing exercise...');
  
  // Load or initialize state
  currentState = ExerciseState.loadState();
  console.log('📦 Loaded state from localStorage:', currentState);
  
  if (!currentState) {
    console.log('⚠️ No saved state found, creating new state...');
    // No saved state, start fresh at 1.1.1
    currentState = ExerciseState.initializeState('1.1.1');
    console.log('✨ New state created:', currentState);
    ExerciseState.saveState(currentState);
    console.log('💾 New state saved to localStorage');
  }
  
  // Validate state structure
  if (!currentState || !currentState.currentState) {
    console.error('❌ ERROR: State is invalid after initialization!', currentState);
    // Force reset
    currentState = ExerciseState.initializeState('1.1.1');
    ExerciseState.saveState(currentState);
    console.log('🔄 Forced state reset:', currentState);
  }
  
  // Load the next question based on current state
  loadNextQuestion();
  
  console.log('✅ Exercise initialized successfully:', currentState);
}

/**
 * Handles castle click event - shows the interaction area
 * Triggered when user clicks or presses Enter/Space on castle
 * 
 * @param {Event} event - The click or keydown event
 * @returns {void}
 */
function handleCastleClick(event) {
  // For keyboard events, only respond to Enter or Space
  if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') {
    return;
  }
  
  // Prevent default for space key to avoid page scroll
  if (event.key === ' ') {
    event.preventDefault();
  }
  
  showInteractionArea();
}

/**
 * Shows the interaction area with fade-in effect
 * Focuses on the answer input for immediate user interaction
 * 
 * @returns {void}
 */
function showInteractionArea() {
  if (interactionArea) {
    interactionArea.classList.remove('hidden');
    
    // Focus on input after animation completes
    setTimeout(() => {
      if (answerInput) {
        answerInput.focus();
      }
    }, 300);
  }
}

/**
 * Displays a question in the UI
 * Updates the question text display element with question and progress
 * 
 * @param {Object} question - Question object with a, b properties
 * @returns {void}
 */
function displayQuestion(question) {
  if (questionText && question) {
    // Get current question number
    const parsed = ExerciseState.parseStateCode(currentState.currentState);
    const questionNumber = parsed ? parsed.question : 1;
    
    // Format question with progress indicator (i18n)
    const formattedQuestion = QuestionGenerator.formatQuestion(question);
    // Get i18n translation for progress
    const lang = window.i18n?.getCurrentLanguage?.() || 'en';
    const translations = window.i18nTranslations || {};
    let progressText = '';
    if (window.i18n && window.i18n.getCurrentLanguage) {
      // Try to get translation from DOM (already loaded by i18n.js)
      const progressKey = 'castleExercise.progress';
      // Fallback to English if not found
      let progressTemplate = translations[progressKey] || document.querySelector('[data-i18n="castleExercise.progress"]')?.textContent || 'Question {current} of {total}';
      progressText = progressTemplate.replace('{current}', questionNumber).replace('{total}', MAX_QUESTIONS);
    } else {
      progressText = `Question ${questionNumber} of ${MAX_QUESTIONS}`;
    }
    questionText.innerHTML = `
      <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;" data-i18n="castleExercise.progress" data-i18n-vars='{"current":${questionNumber},"total":${MAX_QUESTIONS}}'>
        ${progressText}
      </div>
      <div style="font-size: 2.5rem;">
        ${formattedQuestion}
      </div>
    `;
    
    // Clear previous answer and feedback
    if (answerInput) {
      answerInput.value = '';
      answerInput.style.display = 'block'; // Ensure visible
    }
    if (submitButton) {
      submitButton.style.display = 'block'; // Ensure visible
    }
    if (feedbackMessage) {
      feedbackMessage.textContent = '';
      feedbackMessage.className = 'feedback-message';
    }
  }
}

/**
 * Loads the next question based on current state
 * Generates a unique question and updates the display
 * Or shows completion message if all questions are done
 * 
 * @returns {void}
 */
function loadNextQuestion() {
  if (!currentState) {
    console.error('Cannot load question: state is not initialized');
    return;
  }
  
  // Parse current state code to get question number
  const parsed = ExerciseState.parseStateCode(currentState.currentState);
  
  if (!parsed) {
    console.error('Failed to parse state code:', currentState.currentState);
    // Reset to beginning if state is corrupted
    currentState = ExerciseState.initializeState('1.1.1');
    ExerciseState.saveState(currentState);
    return loadNextQuestion(); // Retry with fresh state
  }
  
  const { question: questionNumber } = parsed;
  
  // Check if exercise is complete
  if (questionNumber > MAX_QUESTIONS) {
    showCompletionMessage();
    return;
  }
  
  // Get recent questions for deduplication
  const recentQuestions = currentState.recentQuestions || [];
  
  // Generate unique question
  currentQuestion = QuestionGenerator.generateUniqueQuestion(questionNumber, recentQuestions);
  
  // Display the question
  displayQuestion(currentQuestion);
  
  console.log(`Loaded question ${questionNumber}/${MAX_QUESTIONS}:`, currentQuestion, 'for state:', currentState.currentState);
}

/**
 * Shows completion message when all questions are answered
 * Hides input/button, shows congratulations message
 * 
 * @returns {void}
 */
function showCompletionMessage() {
  console.log('🎉 Exercise complete!');
  
  // Hide input and button
  if (answerInput) answerInput.style.display = 'none';
  if (submitButton) submitButton.style.display = 'none';

  // Update question display to show completion (i18n)
  if (questionText) {
    const congrats = window.i18n?.t('castleExercise.congratulations') || '🎉 Congratulations! 🎉';
    questionText.innerHTML = `<span data-i18n="castleExercise.congratulations">${congrats}</span>`;
    questionText.style.fontSize = '2rem';
  }

  // Show completion message with Continue and Start Over buttons
  if (feedbackMessage) {
    const { totalCorrect, totalAttempts } = currentState;
    const percentage = Math.round((totalCorrect / totalAttempts) * 100);
    
    // Get i18n translations using the API
    const completedAll = window.i18n?.t('castleExercise.completedAll', { total: MAX_QUESTIONS }) || `You completed all ${MAX_QUESTIONS} questions!`;
    const scoreLabel = window.i18n?.t('castleExercise.score') || 'Score:';
    const scoreDetail = window.i18n?.t('castleExercise.scoreDetail', {
      correct: totalCorrect,
      attempts: totalAttempts,
      percent: percentage
    }) || `${totalCorrect} correct out of ${totalAttempts} attempts (${percentage}%)`;
    const startOver = window.i18n?.t('castleExercise.startOver') || 'Start Over';
    const continueLabel = window.i18n?.t('castleExercise.continue') || 'Continue';
    
    feedbackMessage.innerHTML = `
      <div style="text-align: center;">
        <p style="font-size: 1.3rem; margin-bottom: 1rem;">${completedAll}</p>
        <p style="font-size: 1.1rem; margin-bottom: 1rem;"><strong>${scoreLabel}</strong> ${scoreDetail}</p>
        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1.5rem;">
          <button id="continue-btn" style="background: #fff; color: #4CAF50; border: 2px solid #4CAF50; padding: 12px 24px; font-size: 1.1rem; border-radius: 8px; cursor: pointer; min-width: 120px;">${continueLabel}</button>
          <button id="startover-btn" style="background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%); color: white; border: none; padding: 12px 24px; font-size: 1.1rem; border-radius: 8px; cursor: pointer; min-width: 120px;">🔄 ${startOver}</button>
        </div>
      </div>
    `;
    feedbackMessage.className = 'feedback-message correct';
    feedbackMessage.style.display = 'flex';

    // Add event listeners for the buttons
    const continueBtn = document.getElementById('continue-btn');
    const startOverBtn = document.getElementById('startover-btn');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        // Hide the modal/feedback and show the interaction area again
        if (feedbackMessage) feedbackMessage.innerHTML = '';
        if (interactionArea) interactionArea.classList.add('hidden');
      });
    }
    if (startOverBtn) {
      startOverBtn.addEventListener('click', () => {
        // Reset state and restart exercise
        currentState = ExerciseState.initializeState('1.1.1');
        ExerciseState.saveState(currentState);
        if (feedbackMessage) feedbackMessage.innerHTML = '';
        if (interactionArea) interactionArea.classList.add('hidden');
        loadNextQuestion();
      });
    }
  }
}

/**
 * Handles answer submission
 * Validates answer, shows feedback, updates progress, loads next question
 * 
 * @returns {void}
 */
function handleSubmit() {
  if (!currentQuestion || !answerInput) {
    return;
  }
  
  const userAnswer = parseInt(answerInput.value, 10);
  
  // Validate input
  if (isNaN(userAnswer)) {
    showFeedback(false, 'Please enter a number');
    return;
  }
  
  // Check if answer is correct
  const isCorrect = QuestionGenerator.validateAnswer(currentQuestion, userAnswer);
  
  // Create attempt record
  const attempt = {
    stateCode: currentState.currentState,
    question: currentQuestion,
    userAnswer: userAnswer,
    isCorrect: isCorrect,
    timestamp: new Date().toISOString()
  };
  
  // Update state with attempt
  currentState = ExerciseState.updateProgress(currentState, attempt);
  
  // Save updated state
  ExerciseState.saveState(currentState);
  
  // Show feedback
  showFeedback(isCorrect);
  
  // If correct, load next question after delay
  if (isCorrect) {
    setTimeout(() => {
      loadNextQuestion();
    }, 2000);
  } else {
    // If incorrect, allow retry of same question
    if (answerInput) {
      answerInput.value = '';
      answerInput.focus();
    }
  }
}

/**
 * Shows feedback message to user
 * Uses i18n keys for correct/incorrect messages
 * 
 * @param {boolean} isCorrect - Whether the answer was correct
 * @param {string} [customMessage] - Optional custom message to override i18n
 * @returns {void}
 */
function showFeedback(isCorrect, customMessage = null) {
  if (!feedbackMessage) {
    return;
  }
  
  // Clear previous state
  feedbackMessage.className = 'feedback-message';
  
  if (customMessage) {
    feedbackMessage.textContent = customMessage;
    feedbackMessage.classList.add('incorrect');
  } else if (isCorrect) {
    // Get localized correct message using i18n API
    const correctMsg = window.i18n?.t('additionForest.exercise1.correctFeedback') 
      || 'Correct! Well done! 🎉';
    feedbackMessage.textContent = correctMsg;
    feedbackMessage.classList.add('correct');
  } else {
    // Get localized incorrect message using i18n API
    const incorrectMsg = window.i18n?.t('additionForest.exercise1.incorrectFeedback')
      || 'Not quite. Try again! 💪';
    feedbackMessage.textContent = incorrectMsg;
    feedbackMessage.classList.add('incorrect');
  }
}

/**
 * Sets up event listeners after DOM is loaded
 * Initializes DOM element references and attaches handlers
 * 
 * @returns {void}
 */
function setupEventListeners() {
  // Get DOM element references
  castleSpot = document.getElementById('castle-spot');
  interactionArea = document.getElementById('interaction-area');
  questionText = document.getElementById('question-text');
  answerInput = document.getElementById('answer-input');
  submitButton = document.getElementById('submit-button');
  feedbackMessage = document.getElementById('feedback-message');
  
  console.log('🎯 DOM Elements found:');
  console.log('  Castle:', castleSpot ? '✅ Found' : '❌ NOT FOUND');
  console.log('  Interaction Area:', interactionArea ? '✅ Found' : '❌ NOT FOUND');
  console.log('  Question Text:', questionText ? '✅ Found' : '❌ NOT FOUND');
  console.log('  Answer Input:', answerInput ? '✅ Found' : '❌ NOT FOUND');
  console.log('  Submit Button:', submitButton ? '✅ Found' : '❌ NOT FOUND');
  console.log('  Feedback:', feedbackMessage ? '✅ Found' : '❌ NOT FOUND');
  
  // Attach event listeners
  if (castleSpot) {
    castleSpot.addEventListener('click', handleCastleClick);
    castleSpot.addEventListener('keydown', handleCastleClick);
    console.log('🎮 Event listeners attached to castle');
  } else {
    console.error('❌ Cannot attach listeners: castle-spot element not found!');
  }
  
  if (submitButton) {
    submitButton.addEventListener('click', handleSubmit);
  }
  
  if (answerInput) {
    // Submit on Enter key
    answerInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    });
  }
  
  console.log('Event listeners set up');
}

/**
 * Main initialization - runs when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Castle Exercise module loaded');
  
  // Wait for i18n translations to be ready
  if (window.i18n && typeof window.i18n.ready === 'function') {
    await window.i18n.ready();
    console.log('Translations loaded, initializing exercise');
  }
  
  setupEventListeners();
  initializeExercise();
});

// Export functions for testing (optional)
export {
  initializeExercise,
  handleCastleClick,
  showInteractionArea,
  displayQuestion,
  loadNextQuestion,
  handleSubmit,
  showFeedback
};
