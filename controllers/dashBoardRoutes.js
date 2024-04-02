const express = require('express');
const router = express.Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    // Fetch all posts data
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'] // Include the user's name in the result
        }
      ]
    });

    res.render('dashboard', { posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json('Internal server error');
  }
});


module.exports = router;