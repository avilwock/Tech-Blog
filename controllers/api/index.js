// Importing necessary modules and utilities
const router = require('express').Router(); // Express router for defining routes
const userRoutes = require('./userRoutes'); // Importing user routes from userRoutes file
const postRoutes = require('./postRoutes'); // Importing post routes from postRoutes file
const commentRoutes = require('./commentRoutes'); // Importing comment routes from commentRoutes file

// Defining routes for various resources
router.use('/users', userRoutes); // Using userRoutes for routes related to users
router.use('/posts', postRoutes); // Using postRoutes for routes related to posts
router.use('/comments', commentRoutes); // Using commentRoutes for routes related to comments

module.exports = router; // Exporting the router for use in other parts of the application
