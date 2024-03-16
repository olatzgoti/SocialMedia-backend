const express = require("express");
const router = express.Router();
const CommentController = require('../controller/commentController')





router.post('/create', CommentController.create)

router.put('/update/id/:_id', CommentController.update)

router.delete('/delete/id/:_id', CommentController.delete)







module.exports = router;
