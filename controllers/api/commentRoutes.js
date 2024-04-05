// Importing necessary modules and utilities
const router = require('express').Router(); // Express router for defining routes
const { Comment } = require('../../models'); // Importing Comment model from models directory
const withAuth = require('../../utils/auth'); // Middleware for authentication

// Route to get all comments
router.get('/', (req, res) => {
    Comment.findAll({}) // Finding all comments in the database
        .then(dbCommentData => res.json(dbCommentData)) // Sending the retrieved comments as JSON response
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Handling errors
        })
});

// Route to get a single comment by ID
router.get('/:id', (req, res) => {
    Comment.findAll({
            where: {
                id: req.params.id // Finding comment by its ID
            }
        })
        .then(dbCommentData => res.json(dbCommentData)) // Sending the retrieved comment as JSON response
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Handling errors
        })
});

// Route to create a new comment
router.post('/', withAuth, (req, res) => {
    console.log('received comment data:', req.body); // Logging received comment data
    if (req.session) { // Checking if user session exists
        Comment.create({
                comment_text: req.body.comment_text, // Extracting comment text from request body
                post_id: req.body.post_id, // Extracting post ID from request body
                user_id: req.session.user_id, // Extracting user ID from session
            })
            .then(dbCommentData => res.json(dbCommentData)) // Sending the created comment as JSON response
            .catch(err => {
                console.log(err);
                res.status(400).json(err); // Handling errors
            })
    }
});

// Route to create a new comment asynchronously
router.post('/:id', withAuth, async (req, res) => {
    try {
        const { id } = req.params; // Extracting post id from URL
        const { comment_text } = req.body; // Extracting comment text from request body
        const user_id = req.session.user_id; // Extracting user id from session

        // Creating a new comment
        const newComment = await Comment.create({
            comment_text,
            post_id: id, // Assigning post id to the comment
            user_id
        });

        res.status(201).json(newComment); // Sending the created comment as JSON response with 201 status (created)
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Internal server error' }); // Handling errors
    }
});

// Route to delete a comment by ID
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id // Finding comment by its ID for deletion
        }
    }).then(dbCommentData => {
        if (!dbCommentData) { // If no comment is found with the specified ID
            res.status(404).json({ message: 'No comment found with this id' }); // Sending 404 status with error message
            return;
        }
        res.json(dbCommentData); // Sending deleted comment data as JSON response
    }).catch(err => {
        console.log(err);
        res.status(500).json(err); // Handling errors
    });
});

router.post('/add-comment', async (req, res) => {
    try {
        // Handle form submission here
        // For example, save the submitted comment to the database
        const newComment = await Comment.create({
            // Assuming you have a 'comment_text' field in your Comment model
            comment_text: req.body.comment_text,
            // Assuming you have a 'post_id' field in your Comment model
            post_id: req.body.post_id
        });
        // Send a response indicating success
        res.status(201).send('Comment submitted successfully');
    } catch (error) {
        // Handle errors
        console.error('Error submitting comment:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router; // Exporting the router for use in other parts of the application
