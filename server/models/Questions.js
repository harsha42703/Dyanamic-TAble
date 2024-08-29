// server/models/Question.js

const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    level: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Question', QuestionSchema);
