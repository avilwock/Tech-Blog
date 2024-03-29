const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// TODO: Add a comment describing the functionality of the withAuth middleware
//the withAuth middleware ensures that the router sends the user to this page, only if the user is logged in
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // TODO: Add a comment describing the functionality of this property
      //this requires the user be logged in to access this screen
      //we pass this is to the homepage template, but doesn't mean it's necessarily used here. It shows on main.handlebars in this program
      //creates a condtiional statement, if logged in, shows the logged out button
      //cannot access homepage if you're not logged in, because no point in having it if you're on homepage because you can't show the homepage if you aren't logged in.
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // TODO: Add a comment describing the functionality of this if statement
  //this redirects the person to the homepage if they have logged in
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
