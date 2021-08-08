// implement your posts router here

const {find, findById, insert} = require('./posts-model');

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

// WORKS CORRECTLY
// BUT IF SINGULAR FILED IS PASSED (EITHER TITLE OR CONTENTS)
// AND THERE IS A COMMA AFTER THAT FIELD
// IT RETURNS THE BUGGED CIRCULAR REFERENCE SHEET
// AND NOT THE ERROR MESSAGE
// WHY
router.post('/', async (req, res) => {
    const newPost = req.body;
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

// POST SCHEMA
// title: "The post title", // String, required
// contents: "The post contents", // String, required
// created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
// updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date

router.use('/', (req, res) => {
    res.status(200).json({message: '/api/posts/ routes working'})
})

module.exports = router;
