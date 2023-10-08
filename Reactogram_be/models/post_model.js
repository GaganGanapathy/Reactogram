const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const postSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: "UserModel",
  },
  likes: [
    {
      type: ObjectId,
      ref: "UserModel",
    },
  ],
  comments: [
    {
      commentText: String,
      commentedBy: {
        type: ObjectId,
        ref: "UserModel",
      },
    },
  ],
})

module.exports = mongoose.model("PostModel", postSchema)
