// implement your posts router here

const {find, findById, insert, update, remove, findPostComments} = require('./posts-model');

const express = require('express');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const posts = await find();
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json({message: "The posts information could not be retrieved"})
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const post = await findById(id);
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }

    } catch(err) {
        res.status(500).json({message: "The post information could not be retrieved"})
    }
})

router.post('/', async (req, res) => {
    const newPost = req.body;
    console.log(newPost)
    if (!newPost?.title || !newPost?.contents) {
        res.status(400).json({message: "Please provide title and contents for the post"})
    } else {
        try {
            const insertedPost = await insert(newPost);
            res.status(201).json(insertedPost)
        } catch(err) {
            res.status(500).json({ message: "There was an error while saving the post to the database"})
        }
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const postBody = req.body;
    if (!postBody?.title || !postBody?.contents) {
        res.status(400).json({message: "Please provide title and contents for the post"})
    }
    try{
        const doesPostExist = await findById(id);
        console.log('try1' + doesPostExist)
        if (doesPostExist) {
            try {
                const updatedPost = await update(id, postBody);
                res.status(200).json(doesPostExist)
            } catch (err1) {
                res.status(500).json({message: "The post information could not be modified"})
            }
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    } catch(err) {
        res.status(500).json({message: "The post information could not be retrieved"})
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const doesPostExist = await findById(id)
        if (doesPostExist) {
            try {
                const deletedPost = await remove(id);
                res.status(200).json(deletedPost)
            } catch(err1) {
                res.status(500).json({message: "The post could not be removed"})
            }
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    } catch(err) {
        res.status(500).json({message: "The post information could not be retrieved"})
    }
})

router.get('/:id/comments', async (req, res) => {
    const {id} = req.params;
    try {
        const post = await findById(id)
        if (post) {
            try {
                const comments = await findPostComments(id)
                res.status(200).json(comments)
            } catch(err1) {
                res.status(500).json({message: "The comments information could not be retrieved"})
            }
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    } catch(err) {
        res.status(500).json({message: "The post information could not be retrieved"})
    }
})

module.exports = router;
