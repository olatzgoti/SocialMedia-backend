const express = require("express");
const router = express.Router();
const CommentController = require('../controller/commentController')





router.post('/create', CommentController.create)











module.exports = router;
