const express = require('express');
const router = express.Router();
const Question = require('../models/Questions');

// GET /api/questions - Retrieve all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/questions/:id - Retrieve a single question by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/questions - Add a new question
router.post('/', async (req, res) => {
  const { question, code, level } = req.body;

  const newQuestion = new Question({
    question,
    code,
    level,
  });

  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/questions/:id - Update a question
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { question, code, level } = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { question, code, level },
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/questions/:id - Delete a question
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
