const express = require("express");
const postRouter = express.Router();
const Post = require("../models/post.js");

// GET All posts
postRouter.get("/", (req, res, next) => {
    Post.find((err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
});

// GET posts by a user's Id
postRouter.get("/user", (req, res, next) => {
    Post.find({ user: req.query.userId }, (err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
});

// POST new post
postRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    req.body.userString = req.user.username
    const newPost = new Post(req.body)
    newPost.save((err, savedPost) => {
        if(err){
            res.status(500)
            return next(err)
            }
        return res.status(201).send(savedPost)
    })
})

// DELETE post
postRouter.delete(`/delete`, (req, res, next) => {
    Post.findOneAndDelete(
        { _id: req.query.postId, user: req.user._id },
        (err, deletedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted post: ${deletedPost.title}`)
        }
    )
});

// increment vote
postRouter.put("/upvote/:postId", (req, res, next) => {
    Post.findOneAndUpdate({ _id: req.params.postId },
        { $inc: { votes: 1 }, 
        $push: { votedUsers: 
            { $each: [req.user.username]}
        }},
        { new: true },
        (err, updatedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPost)
        }
    )
});

// decrement vote
postRouter.put("/downvote/:postId", (req, res, next) => {
    Post.findOneAndUpdate({ _id: req.params.postId },
        { $inc: { votes: -1 }, 
        $push: { votedUsers: 
            { $each: [req.user.username] } 
        }},
        { new: true },
        (err, updatedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPost)
        }
        )
    });

module.exports = postRouter