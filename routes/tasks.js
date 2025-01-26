const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Assuming Task is your Mongoose model

// Filter tasks route
router.get('/filter', async (req, res) => {
  const { category, status } = req.query;
  const filter = { user: req.user };

  if (category) filter.category = category;
  if (status) filter.status = status;

  try {
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching filtered tasks' });
  }
});

// Add new task route
router.post('/', async (req, res) => {
  const { title, description, dueDate, category } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      category,
      user: req.user,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Task creation failed' });
  }
});

// Update task status route
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Error updating task status' });
  }
});

module.exports = router; // Export the router
