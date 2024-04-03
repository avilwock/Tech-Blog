const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models/');
const { format_date } = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    // Fetch posts data
    const posts = await Post.findAll({
      include: [
        {model: User},
        {model: Comment}
      ]
      // Add any necessary options for fetching posts
    });
    console.log(posts);

    res.render('homepage', { posts }); // Pass posts to the template
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json('Internal server error');
  }
});

router.get('/login', (req, res) => {
  // TODO: Add a comment describing the functionality of this if statement
  //this redirects the person to the homepage if they have logged in
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
    res.render('login', { title: 'Login Page' }); // Assuming your view file is named login.handlebars
  });

  //GET signup route direct user to signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});


module.exports = router;