// Importing necessary modules and utilities
const express = require('express'); // Express framework
const router = express.Router(); // Express router for defining routes
const { Post, User, Comment } = require('../models/'); // Importing Post, User, and Comment models from the models directory
const withAuth = require('../utils/auth'); // Middleware for authentication

// Route to render the "add-post" page for creating a new post
router.get('/new', withAuth, (req, res) => {
  try {
    res.render('add-post', { logged_in: true }); // Rendering the "add-post" template with logged_in flag set to true
  } catch (error) {
    console.error('Error rendering add post page:', error); // Logging error if encountered
    res.status(500).json('Internal server error'); // Sending 500 status with error message if an error occurs
  }
});

// Route to render the dashboard page with all posts created by the current user
router.get('/', withAuth, async (req, res) => {
  try {
    // Fetching all posts data created by the current user
    const posts = await Post.findAll({
      where: { user_id: req.session.user_id }, // Filtering posts by the current user's ID
      include: [ // Including associated models User and Comment
        {
          model: User,
          attributes: ['name'] // Including the user's name in the result
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: [
            {
              model: User,
              attributes: ['name'] // Including the user's name in the comments
            }
          ]
        }
      ],
    });

    // Rendering the dashboard template with posts data and logged_in flag
    res.render('dashboard', { posts, logged_in: req.session.logged_in });
  } catch (error) {
    console.error('Error fetching posts:', error); // Logging error if encountered
    res.status(500).json('Internal server error'); // Sending 500 status with error message if an error occurs
  }
});

// Route to render the "edit-post" page for editing a specific post
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
          where: {
              id: req.params.id // Finding post by its ID
          },
          attributes: ['id', 'title', 'text', 'created_at'], // Selecting specific attributes of the post
          include: [{ // Including associated models User and Comment
                  model: User,
                  attributes: ['name'] // Including the user's name in the result
              },
              {
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['name'] // Including the user's name in the comments
                  }
              }
          ]
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' }); // Sending 404 status with error message if no post is found
              return;
          }

          const post = dbPostData.get({ plain: true }); // Converting Sequelize data to plain object
          res.render('edit-post', { post, logged_in: true }); // Rendering the "edit-post" template with post data and logged_in flag set to true
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err); // Handling errors
      });
})

// Exporting the router for use in other parts of the application
module.exports = router;
