// backend/routes/questions.js

const express = require('express');
const router = express.Router();
const Question = require('../models/Questions'); // Import the schema

// API endpoint to fetch questions by age group
router.get('/questions/:ageGroup', async (req, res) => {
  try {
    const { ageGroup } = req.params;
    const questions = await Question.find({ ageGroup }).limit(5);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching questions' });
  }
});

module.exports = router;
// New route to submit answers and calculate mental stability
router.post('/submit-answers', async (req, res) => {
    const { answers } = req.body; // answers is an object with question IDs as keys and selected options as values
    
    let score = 0;
  
    try {
      // Iterate over the submitted answers
      for (let questionId in answers) {
        const question = await Question.findById(questionId);
        const selectedOption = answers[questionId];
        
        // Assuming each correct answer gives 20 points, adjust as per your logic
        if (selectedOption == question.correctOption) {
          score += 20;
        }
      }
  
      const stabilityPercentage = (score / (5 * 20)) * 100; // Assuming 5 questions, each worth 20 points
      res.json({ stabilityPercentage });
    } catch (error) {
      res.status(500).json({ error: 'Error calculating mental stability' });
    }
  });
  
  module.exports = router;