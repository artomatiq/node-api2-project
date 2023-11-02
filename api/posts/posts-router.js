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

module.exports = router;