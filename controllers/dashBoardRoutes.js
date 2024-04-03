const express = require('express');
const router = express.Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch all posts data
    const posts = await Post.findAll({
        where: { user_id: req.session.user_id },
        include: [
        {
          model: User,
          attributes: ['name'] // Include the user's name in the result
        }
      ]
    });

    res.render('dashboard', { posts, logged_in: req.session.logged_in });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json('Internal server error');
  }
});

router.get('/new', async (req,res) => {
res.render("add-post");
});



module.exports = router;