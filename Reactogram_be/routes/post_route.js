const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const PostModel = require("../models/post_model")
const protectedRoute = require("../middleware/protectedResource")

// all user posts
router.get("/allposts", async (req, res) => {
  try {
    const dbPosts = await PostModel.find({})
      .populate("author", "_id fullName profileImg")
      .populate("comments.commentedBy", "_id fullName")
    res.status(200).json({ posts: dbPosts })
  } catch (error) {
    console.log(error)
  }
})

// users posts
router.get("/myallposts", protectedRoute, async (req, res) => {
  try {
    const dbPosts = await PostModel.find({ author: req.user._id }).populate(
      "author",
      "_id fullName profileImg"
    )
    res.status(200).json({ posts: dbPosts })
  } catch (error) {
    console.log(error)
  }
})

router.post("/createpost", protectedRoute, async (req, res) => {
  const { description, location, image } = req.body
  if (!description || !location || !image) {
    return res.status(400).json({ error: "One or more fields are mandatory" })
  }

  const postObj = new PostModel({
    description,
    location,
    image,
    author: req.user._id,
  })
  const newPost = await postObj.save()
  res.status(201).json({ post: newPost })
})

router.delete("/deletepost/:postId", protectedRoute, async (req, res) => {
  try {
    const postFound = await PostModel.findOneAndDelete({
      _id: req.params.postId,
    })
    // console.log(postFound)

    // check if post author is same as logged in user
    // if (postFound.author._id.toString() === req.user._id.toString()) {
    //   const data = await postFound.remove()
    //   console.log(data)
    //   res.status(200).json({ result: data })
    // }
    res.status(200).json({ result: "success" })
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.put("/like", protectedRoute, async (req, res) => {
  try {
    const result = await PostModel.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      { new: true }
    ).populate("author", "_id fullName")

    res.json(result)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.put("/unlike", protectedRoute, async (req, res) => {
  try {
    const result = await PostModel.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    ).populate("author", "_id fullName")
    res.json(result)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.put("/comment", protectedRoute, async (req, res) => {
  try {
    const comment = {
      commentText: req.body.commentText,
      commentedBy: req.user._id,
    }
    const result = await PostModel.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      { new: true }
    )
      .populate("comments.commentedBy", "_id fullName") //comment owner
      .populate("author", "_id fullName") //post owner
    res.json(result)
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router
