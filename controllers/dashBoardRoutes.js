const express = require('express');
const router = express.Router();
const { Post } = require('../models/');

router.get('/', async (req, res) => {
  try {
    // Fetch posts data
    const post = await Post.findAll({
      // Add any necessary options for fetching posts
    });
    console.log(post);

    res.render('dashboard', { post }); // Pass posts to the template
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json('Internal server error');
  }
});

module.exports = router;