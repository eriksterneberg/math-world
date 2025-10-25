/**
 * Question Generator Module
 * Generates random addition questions with progressive difficulty
 * Feature: Interactive Castle Starting Point with Addition Exercises
 */

/**
 * @typedef {Object} AdditionQuestion
 * @property {number} addend1 - First addend (1-99)
 * @property {number} addend2 - Second addend (1-99)
 * @property {number} correctAnswer - Sum (≤100)
 */

/**
 * Generates a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer in range
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates an addition question with difficulty scaled to question number
 * @param {number} questionNumber - Sequential question number (1-∞)
 * @returns {AdditionQuestion} Question with addend1, addend2, correctAnswer
 */
export function generateQuestion(questionNumber) {
  // Progressive difficulty: start easy, gradually increase
  const maxSum = Math.min(20 + (questionNumber * 5), 100);
  const minSum = Math.min(10 + (questionNumber * 2), 50);
  
  // Generate target sum in range
  const targetSum = randomInt(minSum, maxSum);
  
  // Split into two addends
  // Avoid 0 and very unbalanced splits for better learning experience
  const minAddend = Math.max(1, Math.floor(targetSum * 0.2));
  const maxAddend = Math.min(99, Math.floor(targetSum * 0.8));
  const addend1 = randomInt(minAddend, maxAddend);
  const addend2 = targetSum - addend1;
  
  // Ensure addend2 is valid (positive and ≤99)
  if (addend2 < 1 || addend2 > 99) {
    // Fallback: use simpler split
    const half = Math.floor(targetSum / 2);
    return {
      addend1: half,
      addend2: targetSum - half,
      correctAnswer: targetSum
    };
  }
  
  return {
    addend1,
    addend2,
    correctAnswer: targetSum
  };
}

/**
 * Checks if the user's answer is correct
 * @param {AdditionQuestion} question - The question being answered
 * @param {number} userAnswer - Student's submitted answer
 * @returns {boolean} true if correct, false otherwise
 */
export function validateAnswer(question, userAnswer) {
  return userAnswer === question.correctAnswer;
}

/**
 * Formats a question as a readable string
 * @param {AdditionQuestion} question - Question to format
 * @returns {string} Formatted string (e.g., "23 + 45 = ?")
 */
export function formatQuestion(question) {
  return `${question.addend1} + ${question.addend2} = ?`;
}

/**
 * Checks if a question is a duplicate of recent questions
 * @param {AdditionQuestion} question - Question to check
 * @param {AdditionQuestion[]} recentQuestions - Array of recent questions
 * @returns {boolean} true if duplicate found, false otherwise
 */
export function isDuplicate(question, recentQuestions) {
  return recentQuestions.some(recent => 
    // Order-independent comparison: 23+45 equals 45+23
    (recent.addend1 === question.addend1 && recent.addend2 === question.addend2) ||
    (recent.addend1 === question.addend2 && recent.addend2 === question.addend1)
  );
}

/**
 * Generates a question that's not a duplicate of recent questions
 * @param {number} questionNumber - Sequential question number
 * @param {AdditionQuestion[]} recentQuestions - Array of recent questions to avoid
 * @returns {AdditionQuestion} Question guaranteed to be unique (or after max attempts)
 */
export function generateUniqueQuestion(questionNumber, recentQuestions) {
  let attempts = 0;
  const maxAttempts = 100;
  let question;
  
  do {
    question = generateQuestion(questionNumber);
    attempts++;
  } while (isDuplicate(question, recentQuestions) && attempts < maxAttempts);
  
  // After max attempts, return anyway (extremely unlikely to hit this)
  if (attempts >= maxAttempts) {
    console.warn('Could not generate unique question after 100 attempts, returning duplicate');
  }
  
  return question;
}
