const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctOption: {
    type: Number,
    required: true, // Set to true if it's always required
  },
  ageGroup: {
    type: String, // Example: '5-7', '8-10', etc.
    required: true,
  },
});

// Optional: Add an index to the ageGroup field for performance optimization
QuestionSchema.index({ ageGroup: 1 });

const Question = mongoose.model('questions', QuestionSchema);

module.exports = Question;

