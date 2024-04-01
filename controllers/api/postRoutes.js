const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
            attributes: ['id', 'title', 'text', 'created_at'],
            order: [
                ['created_at', 'DESC']
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
            const post = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { post });
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

router.post('/', (req, res) => {
    Post.create({
            title: req.body.title,
            content: req.body.text,
            user_id: req.session.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.text
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

module.exports = router;