const withAuth = (req, res, next) => {
  // TODO: Add a comment describing the functionality of this if statement
  //this sends the user to the login screen if they aren't logged in, otherwise it sends them onto the page
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
