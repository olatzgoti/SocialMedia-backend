const User = require("../model/UserModel");
const Post = require("../model/PostModel");
const Comment = require("../model/CommentModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
//console.log(jwt_secret)

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    //console.log(token)
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: payload._id, tokens: token });
    if (!user) {
      return res.status(404).send({ message: "Not authorized" });
    }
    req.user = user;
    next();
  }
  catch (error) {
    console.error(error);
    return res
      .status(404)
      .send({ message: "There was a problem with the token" });
  }
};

const isAdmin = async (req, res, next) => {
  const admins = ["admin", "superadmin"];
  if (!admins.includes(req.user.role)) {
    return res.status(403).send({ message: `You don't have permission` });
  }
  next();
};

const isSuperAdmin = async (req, res, next) => {
  const admins = ["superadmin"];
  if (!admins.includes(req.user.role)) {
    return res.status(403).send({ message: `You don't have permission` });
  }
  next();
};

const isPostAuthor = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: `This is not your post` });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "There was an error when checking the author of the post",
    });
  }
};

const isCommentAuthor = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params._id);
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: `This is not your comment` });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "There was an error when checking the author of the post",
    });
  }
};

module.exports = {
  authentication,
  isAdmin,
  isSuperAdmin,
  isPostAuthor,
  isCommentAuthor,
};
