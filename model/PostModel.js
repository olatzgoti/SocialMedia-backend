const mongoose = require("mongoose");

const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: [true, "Please write a title for your post"],
    },
    content: {
      type: String,
      required: [true, "Please write some content for your post"],
    },
    image: {
      type: String,
    },
    likes: [
      {
        userId: ObjectId,
        like: Boolean,
      },
    ],
    commentsId: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;