// Importing necessary modules and utilities
const express = require('express'); // Express framework
const router = express.Router(); // Express router for defining routes
const { Post, Comment, User } = require('../models/'); // Importing Post, Comment, and User models from the models directory
const { format_date } = require('../utils/helpers'); // Importing helper function for formatting dates

// Route to render the homepage
router.get('/', async (req, res) => {
  try {
    // Fetching posts data including associated models User and Comment
    const posts = await Post.findAll({
      include: [
        {model: User}, // Including User model
        {model: Comment} // Including Comment model
      ]
      // Add any necessary options for fetching posts
    });
    console.log(posts);

    // Rendering the homepage template with posts data and logged_in flag
    res.render('homepage', { posts, logged_in: req.session.logged_in }); // Passing posts to the template
  } catch (error) {
    console.error('Error fetching posts:', error); // Logging error if encountered
    res.status(500).json('Internal server error'); // Sending 500 status with error message if an error occurs
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  // TODO: Add a comment describing the functionality of this if statement
  // This condition checks if the user is already logged in, if yes, it redirects them to the homepage
  if (req.session.logged_in) {
    res.redirect('/'); // Redirecting to the homepage
    return;
  }
  res.render('login', { title: 'Login Page' }); // Rendering the login template with title set to 'Login Page'
});

// Route to render the signup page
router.get("/signup", (req, res) => {
  res.render("signup"); // Rendering the signup template
});

// Exporting the router for use in other parts of the application
module.exports = router;
