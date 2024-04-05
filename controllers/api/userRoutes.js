// Importing necessary modules and utilities
const router = require('express').Router(); // Express router for defining routes
const { User, Post, Comment } = require('../../models'); // Importing User, Post, and Comment models from the models directory

// Route to get all users
router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['[password'] } // Excluding password attribute from the response
        })
        .then(dbUserData => res.json(dbUserData)) // Sending the retrieved user data as JSON response
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Handling errors
        });
});

// Route to get a single user by ID with associated posts and comments
router.get('/:id', (req, res) => {
    User.findOne({
            attributes: { exclude: ['password'] }, // Excluding password attribute from the response
            where: {
                id: req.params.id // Finding user by ID
            },
            include: [{ // Including associated models Post and Comment
                    model: Post,
                    attributes: ['id', 'title', 'text', 'created_at'] // Selecting specific attributes of posts
                },

                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'], // Selecting specific attributes of comments
                    include: { // Including associated model Post for comments
                        model: Post,
                        attributes: ['title'] // Selecting only the title attribute of the post
                    }
                },
                {
                    model: Post,
                    attributes: ['title'], // Selecting only the title attribute of the post
                }
            ]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' }); // Sending 404 status with error message if no user is found
                return;
            }
            res.json(dbUserData); // Sending the retrieved user data as JSON response
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Handling errors
        });
});

// Route to create a new user
router.post('/', (req, res) => {
    User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password // Creating new user with provided name, email, and password
        })

        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id; // Saving user ID to session
                req.session.name = dbUserData.name; // Saving user name to session
                req.session.logged_in = true; // Setting logged_in flag to true in session

                res.json(dbUserData); // Sending the created user data as JSON response
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Handling errors
        });
});

// Route to login a user
router.post('/login', (req, res) => {
    User.findOne({
            where: {
                email: req.body.email // Finding user by email
            }
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user with that username!' }); // Sending 400 status with error message if no user is found
                return;
            }
            const validPassword = dbUserData.checkPassword(req.body.password); // Checking password validity

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' }); // Sending 400 status with error message if password is incorrect
                return;
            }
            req.session.save(() => {

                req.session.user_id = dbUserData.id; // Saving user ID to session
                req.session.name = dbUserData.name; // Saving user name to session
                req.session.logged_in = true; // Setting logged_in flag to true in session

                res.redirect('/dash'); // Redirecting to dashboard after successful login
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Handling errors
        });
});

// Route to logout a user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/'); // Redirecting to home page after logout
        });
    } else {
        res.status(404).end(); // Sending 404 status if no user is logged in
    }
});

// Route to update a user by ID
router.put('/:id', (req, res) => {

    User.update(req.body, {
            individualHooks: true, // Using individual hooks for updating
            where: {
                id: req.params.id // Finding user by ID for updating
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' }); // Sending 404 status with error message if no user is found
                return;
            }
            res.json(dbUserData); // Sending the updated user data as JSON response
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Handling errors
        });

});

// Route to delete a user by ID
router.delete('/:id', (req, res) => {
    User.destroy({
            where: {
                id: req.params.id // Finding user by ID for deletion
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' }); // Sending 404 status with error message if no user is found
                return;
            }
            res.json(dbUserData); // Sending the deleted user data as JSON response
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); // Handling errors
        });
});

module.exports = router; // Exporting the router for use in other parts of the application
