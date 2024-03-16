const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: ObjectId,
      ref: "Post",
      required: [true, "Please write the post that you want to comment in"],
    },
    content: {
      type: String,
      required: [true, "Please insert your comment"],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
