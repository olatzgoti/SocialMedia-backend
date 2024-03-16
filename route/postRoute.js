const express = require('express')
const router = express.Router()
const postController = require('../controller/postController')


//const {  authentication,  isAuthorPost,} = require("../middlewares/authentication");


router.get('/', postController.getAll)
router.post('/create', postController.create)
router.put('/update/id/:_id', postController.update)
router.delete('/delete/id/:_id', postController.delete)
router.get('/getById/id/:_id', postController.getById)
router.put('/like/id/:_id', postController.like)
module.exports = router