const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models/');
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

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: ['id',
              'title',
              'text',
              'created_at'
          ],
          include: [{
                  model: User,
                  attributes: ['name']
              },
              {
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['name']
                  }
              }
          ]
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }

          const post = dbPostData.get({ plain: true });
          res.render('edit-post', { post, loggedIn: true });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
})

module.exports = router;