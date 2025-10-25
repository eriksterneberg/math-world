# Exercise Configuration

## Castle Exercise (Exercise 1.1)

**Total Questions**: 10

### Question Progression

| Question # | Difficulty | Sum Range | Description |
|-----------|-----------|-----------|-------------|
| 1-4 | Easy | 10-40 | Introduction level |
| 5-10 | Medium | 20-70 | Increasing challenge |

### Progressive Difficulty Formula

```javascript
// Questions get harder as student progresses
maxSum = min(20 + (questionNumber * 5), 100)
minSum = min(10 + (questionNumber * 2), 50)
```

**Examples:**
- Question 1: Sum between 10-25 (e.g., 7 + 8 = 15)
- Question 5: Sum between 20-45 (e.g., 18 + 23 = 41)
- Question 10: Sum between 30-70 (e.g., 32 + 35 = 67)

### Completion

After answering all 10 questions correctly, students see:
- 🎉 Congratulations message
- Final score (X correct out of Y attempts)
- Success percentage
- Option to start over

### Features

✅ **Progress Tracking**
- "Question X of 10" displayed above each question
- Real-time progress indicator

✅ **Deduplication**
- Tracks last 10 questions
- No immediate repeats
- Order-independent (12+8 = 8+12)

✅ **Persistence**
- Progress saved to localStorage
- Resume from where you left off
- State code format: "1.1.X" (X = 1-10)

✅ **Completion Handling**
- Exercise ends after question 10
- Shows total score
- Allows restart with clean state

### How to Change Number of Questions

Edit `MAX_QUESTIONS` constant in `/frontend/scripts/castle-exercise.js`:

```javascript
// Configuration
const MAX_QUESTIONS = 10; // Change this number
```

**Note**: If you increase beyond 10, consider adjusting the difficulty progression formula to ensure appropriate challenge levels.
