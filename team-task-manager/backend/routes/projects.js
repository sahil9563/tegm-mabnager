const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const Project = require('../models/Project');

const router = express.Router();

// Create project (admin only)
router.post('/', [auth, adminAuth], async (req, res) => {
  try {
    const project = new Project({ ...req.body, admin: req.user.id });
    await project.save();
    await project.populate('admin members');
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// List projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ admin: req.user.id }).populate('admin members');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

