// Importing necessary modules and utilities
const router = require('express').Router(); // Express router for defining routes
const { Post, User, Comment } = require('../../models'); // Importing Post, User, and Comment models from the models directory
const sequelize = require('../../config/connection'); // Importing Sequelize connection
const withAuth = require('../../utils/auth'); // Middleware for authentication

// Route to get all posts with associated user and comments
router.get('/', (req, res) => {
    Post.findAll({
            attributes: ['id', 'title', 'text', 'created_at'], // Selecting specific attributes to include in the response
            order: [['created_at', 'DESC']], // Sorting posts by created_at attribute in descending order
            include: [ // Including associated models User and Comment
                {model: User, attributes: ['name']}, // Including User model and selecting only the name attribute
                {
                    model: Comment, // Including Comment model
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'], // Selecting specific attributes of comments
                    include: { // Including associated model User for comments
                        model: User,
                        attributes: ['name'] // Selecting only the name attribute of the user
                    }
                }
            ]
        })
        .then(dbPostData => {
            res.json(dbPostData); // Sending the retrieved data as JSON response
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Handling errors
        });

});

// Route to get a single post by ID
router.get('/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id // Finding post by its ID
            },
            attributes: ['id', 'text', 'title', 'created_at'], // Selecting specific attributes to include in the response
            include: [ // Including associated models User and Comment
                {
                    model: User,
                    attributes: ['name'] // Selecting only the name attribute of the user
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'], // Selecting specific attributes of comments
                    include: { // Including associated model User for comments
                        model: User,
                        attributes: ['name'] // Selecting only the name attribute of the user
                    }
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                return res.status(404).json({ message: 'No post found with this id' }); // Sending 404 status with error message if no post is found
            }
            // Render the single-post template and pass the post data to it (assuming this route is used in a server-side rendered application)
            res.render('single-post', { post: dbPostData });
        })
        .catch(err => {
            console.error('Error fetching post:', err);
            res.status(500).json({ message: 'Internal server error' }); // Handling errors
        });
});

// Route to update a post by ID
router.put('/:id', (req, res) => {
    Post.update({
            title: req.body.title, // Updating title with the value provided in request body
            text: req.body.text // Updating text with the value provided in request body
        }, {
            where: {
                id: req.params.id // Finding post by its ID for updating
            }
        }).then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' }); // Sending 404 status with error message if no post is found
                return;
            }
            res.json(dbPostData); // Sending updated post data as JSON response
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Handling errors
        });
});

// Route to delete a post by ID
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id // Finding post by its ID for deletion
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' }); // Sending 404 status with error message if no post is found
            return;
        }
        res.json(dbPostData); // Sending deleted post data as JSON response
    }).catch(err => {
        console.log(err);
        res.status(500).json(err); // Handling errors
    });
});

// Route to create a new post
router.post('/', async (req, res) => {
    try {
      const { title, text } = req.body; // Extracting title and text from request body
      const user_id = req.session.user_id; // Extracting user ID from session
  
      const newPost = await Post.create({
        title,
        text, // Ensure that you're providing a value for the text attribute
        user_id: user_id // Assigning user ID to the new post
      });
  
      res.redirect('/dash'); // Redirecting to dashboard after creating the post
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json('Internal server error'); // Handling errors
    }
  });

// Route to create a new comment for a specific post
router.post('/:post_id', async (req, res) => {
    try {
      const post_id = req.params.post_id; // Extracting post ID from URL parameters
      const { comment_text } = req.body; // Extracting comment text from request body
  
      const newComment = await Comment.create({
        post_id: post_id, // Assigning post ID to the new comment
        comment_text: comment_text, // Assigning comment text
      });
  
      res.status(201).json(newComment); // Sending the created comment as JSON response with 201 status (created)
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handling errors
    }
});

module.exports = router; // Exporting the router for use in other parts of the application
