/**
 * Exercise State Management Module
 * Manages exercise progress state and localStorage persistence
 * Feature: Interactive Castle Starting Point with Addition Exercises
 */

const STORAGE_KEY = 'mathworld.additionForest.exercise1';

/**
 * @typedef {Object} ExerciseProgress
 * @property {string} currentState - Current state code (e.g., "1.1.3")
 * @property {Object.<string, QuestionAttempt>} progress - Map of attempts by state code
 * @property {number} [sessionStart] - Session start timestamp
 * @property {number} lastUpdated - Last update timestamp
 */

/**
 * @typedef {Object} QuestionAttempt
 * @property {string} stateCode - State code string (e.g., "1.1.1")
 * @property {Object} question - The question asked
 * @property {number} userAnswer - Student's answer
 * @property {boolean} correct - Whether answer was correct
 * @property {number} timestamp - Unix timestamp in ms
 */

/**
 * Loads the current exercise progress from localStorage
 * @returns {ExerciseProgress|null} Progress object if exists and valid, null otherwise
 */
export function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const state = JSON.parse(stored);
    
    // Validate structure
    if (!state.currentState || !state.progress || typeof state.progress !== 'object') {
      console.warn('Invalid state structure in localStorage');
      return null;
    }
    
    // Ensure all fields exist (for backwards compatibility)
    return {
      ...state,
      recentQuestions: state.recentQuestions || [],
      totalCorrect: state.totalCorrect || 0,
      totalAttempts: state.totalAttempts || 0
    };
  } catch (error) {
    console.error('Failed to load state:', error);
    return null;
  }
}

/**
 * Persists exercise progress to localStorage
 * @param {ExerciseProgress} state - The progress object to save
 * @returns {boolean} true if save succeeded, false otherwise
 */
export function saveState(state) {
  try {
    // Update timestamp
    state.lastUpdated = Date.now();
    
    // Serialize and save
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error('Failed to save state:', error);
    return false;
  }
}

/**
 * Creates a new, empty progress state starting at the given state code
 * @param {string} startingCode - Where to begin (typically "1.1.1")
 * @returns {ExerciseProgress} Fresh progress object
 */
export function initializeState(startingCode) {
  const now = Date.now();
  return {
    currentState: startingCode,
    progress: {},
    recentQuestions: [],
    totalCorrect: 0,
    totalAttempts: 0,
    sessionStart: now,
    lastUpdated: now
  };
}

/**
 * Adds a completed question attempt to the progress and advances to next question
 * @param {ExerciseProgress} state - Current progress state
 * @param {QuestionAttempt} attempt - The completed question attempt
 * @returns {ExerciseProgress} New progress object with attempt added and state advanced
 * @throws {Error} if attempt.stateCode doesn't match state.currentState
 */
export function updateProgress(state, attempt) {
  // Validate state code match
  if (attempt.stateCode !== state.currentState) {
    throw new Error(
      `State code mismatch: attempt is for ${attempt.stateCode} but current state is ${state.currentState}`
    );
  }
  
  // Update recent questions list (keep last 10)
  const recentQuestions = state.recentQuestions || [];
  const updatedRecent = [attempt.question, ...recentQuestions].slice(0, 10);
  
  // Create new state with immutable update
  const newState = {
    ...state,
    progress: {
      ...state.progress,
      [attempt.stateCode]: attempt
    },
    recentQuestions: updatedRecent,
    totalAttempts: (state.totalAttempts || 0) + 1,
    totalCorrect: (state.totalCorrect || 0) + (attempt.isCorrect ? 1 : 0),
    currentState: attempt.isCorrect ? getNextStateCode(attempt.stateCode) : state.currentState,
    lastUpdated: Date.now()
  };
  
  return newState;
}

/**
 * Calculates the next state code in sequence
 * @param {string} currentCode - Current state code (e.g., "1.1.5")
 * @returns {string} Next state code (e.g., "1.1.6")
 * @throws {Error} if currentCode format is invalid
 */
export function getNextStateCode(currentCode) {
  const parts = parseStateCode(currentCode);
  if (!parts) {
    throw new Error(`Invalid state code format: ${currentCode}`);
  }
  
  // Increment question number
  return `${parts.world}.${parts.exercise}.${parts.question + 1}`;
}

/**
 * Parses a state code string into its components
 * @param {string} code - State code to parse (e.g., "1.1.5")
 * @returns {{world: number, exercise: number, question: number}|null} Parsed components or null if invalid
 */
export function parseStateCode(code) {
  // Validate input
  if (!code || typeof code !== 'string') {
    console.error('parseStateCode: Invalid code provided:', code);
    return null;
  }
  
  const match = code.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) {
    console.error('parseStateCode: Code does not match expected format:', code);
    return null;
  }
  
  return {
    world: parseInt(match[1], 10),
    exercise: parseInt(match[2], 10),
    question: parseInt(match[3], 10)
  };
}

/**
 * Clears all saved progress from localStorage
 * @returns {boolean} true if clear succeeded, false otherwise
 */
export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear progress:', error);
    return false;
  }
}
