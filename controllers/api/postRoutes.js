const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
            attributes: ['id', 'title', 'text', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                {model: User, attributes: ['name']},
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
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});
router.get('/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'text',
                'title',
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
                return res.status(404).json({ message: 'No post found with this id' });
            }
            // Render the single-post template and pass the post data to it
            res.render('single-post', { post: dbPostData });
        })
        .catch(err => {
            console.error('Error fetching post:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
});


// router.put('/:id', withAuth, (req, res) => {
//     Comment.update({
//         comment_text: req.body.comment_text
//     }, {
//         where: {
//             id: req.params.id
//         }
//     }).then(dbCommentData => {
//         if (!dbCommentData) {
//             res.status(404).json({ message: 'No comment found with this id' });
//             return;
//         }
//         res.json(dbCommentData);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

router.put('/:id', (req, res) => {
    Post.update({
            title: req.body.title,
            text: req.body.text
        }, {
            where: {
                id: req.params.id
            }
        }).then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', async (req, res) => {
    try {
      const { title, text } = req.body;
      const user_id = req.session.user_id;
  
      const newPost = await Post.create({
        title,
        text, // Ensure that you're providing a value for the text attribute
        user_id: user_id
      });
  
      res.redirect('/dash');
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json('Internal server error');
    }
  });

  router.post('/:post_id', async (req, res) => {
    try {
      const post_id = req.params.post_id;
      const { comment_text } = req.body;
  
      const newComment = await Comment.create({
        post_id: post_id,
        comment_text: comment_text,
      });
  
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;