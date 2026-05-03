const express = require('express');
const { auth } = require('../middleware/auth');
const Task = require('../models/Task');
const Project = require('../models/Project');

const router = express.Router();

// Create task
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, createdBy: req.user.id });
    await task.save();
    await task.populate('assignee project createdBy');
    
    // Add to project
    await Project.findByIdAndUpdate(task.project, { $push: { tasks: task._id } });
    
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// List tasks (with overdue filter)
router.get('/', auth, async (req, res) => {
  try {
    const { status, overdue } = req.query;
    let query = { createdBy: req.user.id };
    
    if (status) query.status = status;
    if (overdue === 'true') query.dueDate = { $lt: new Date() };
    
    const tasks = await Task.find(query).populate('assignee project createdBy').sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update task status
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('assignee project createdBy');
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

