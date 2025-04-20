const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost');

// GET all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all blog posts
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await BlogPost.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
