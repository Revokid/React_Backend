const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost');
const cors = require('cors');

const app = express();

app.use(cors()); 

app.use(cors({
  origin: 'http://localhost:3001'
}));

app.use(express.json());

// Homepage route
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    const blogPosts = await BlogPost.find();
    res.render('index', { projects, blogPosts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;