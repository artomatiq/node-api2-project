const express = require('express');
const router = express.Router();
const Posts = require('./posts-model')


router.get('/', (req, res) => {
    Posts.find()
        .then (posts => {
            res.status(200).json(posts)
        })
        .catch (() => {
            res.status(500).json({message: 'The posts information could not be retrieved'})
        })
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    Posts.findById(id)
        .then (post => {
            if (!post) {
                return res.status(404).json({message: 'The post with the specified ID does not exist'})
            }
            res.status(200).json(post)
        })
        .catch ( () => {
            res.status(500).json({message: 'The post information could not be retrieved'})
        })
})

module.exports = router;