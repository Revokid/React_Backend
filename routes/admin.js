const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost');

// Render the admin page
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    const blogPosts = await BlogPost.find();
    res.render('admin', { projects, blogPosts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add Project
router.post('/add-project', async (req, res) => {
  const { title, description, imageUrl, projectUrl } = req.body;
  try {
    const newProject = new Project({ title, description, imageUrl, projectUrl });
    await newProject.save();
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add Blog Post
router.post('/add-blog', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newBlogPost = new BlogPost({ title, content, author });
    await newBlogPost.save();
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete Project
router.post('/delete-project/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete Blog Post
router.post('/delete-blog/:id', async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;