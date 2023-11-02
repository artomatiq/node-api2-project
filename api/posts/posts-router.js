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

router.post('/', (req, res) => {
    const {title, contents} = req.body;
    const post = {title, contents}
    let id = null
    if (!title || !contents) {
        return res.status(400).json({message: 'Please provide title and contents for the post'})
    }
    Posts.insert(post)
        .then ((responseID) => {
            id = responseID.id
            return Posts.findById(id)
        })
        .then ((responsePost)=> {
            res.status(201).json(responsePost)
        })
        .catch (()=> {
            res.status(500).json({message: 'There was an error while saving the post to the database'})
        })
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const {title, contents} = req.body

    if (!title || !contents) {
        return res.status(400).json({message: 'Please provide title and contents for the post'})
    }

    Posts.findById(id)
        .then (post => {
            if (!post) {
                return res.status(404).json({message: "The post with the specified ID does not exist"})
            }
            else {
                return Posts.update(id, {title, contents})
            }
        })
        .then (()=>{
            return Posts.findById(id)
        })
        .then ((newPost)=> {
            res.status(200).json(newPost)
        })
        .catch (()=>{
            res.status(500).json({message: 'The post information could not be modified'})
        })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params
    let deletedPost = {}

    Posts.findById(id)
        .then (post=>{
            console.log(post)
            if (!post) {
                res.status(404).json({message: 'The post with the specified ID does not exist'});
            }
            else {
                deletedPost = post
                return Posts.remove(id)
            }
        })
        .then (()=>{
            res.status(200).json(deletedPost)
        })
        .catch(()=>{
            // res.status(500).json({message: 'The post could not be removed'});
        })
})

router.get('/:id/comments', (req, res) => {
    const {id} = req.params

    Posts.findById(id)
        .then (post => {
            console.log(post)
            if(!post) {
                res.status(404).json({message: 'The post with the specified ID does not exist'});
            }
            else {
                return Posts.findPostComments(id)
            }
        })
        .then (comments=> {
            res.status(200).json(comments)
        })
        .catch(()=>{
            res.status(500).json({message: 'The comments information could not be retrieved'});
        })
})

module.exports = router;