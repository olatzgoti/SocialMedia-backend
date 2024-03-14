const express = require('express')
const router = express.Router()
const postController = require('../controller/postController')
const { authentication, isPostAuthor, } = require('../middleware/auth')

//const {  authentication,  isAuthorPost,} = require("../middlewares/authentication");


router.get('/', postController.getAll)
router.post('/create', authentication, postController.create)
router.put('/id/:_id', authentication, isPostAuthor, postController.update)
router.delete('/id/:_id', authentication, isPostAuthor, postController.delete)

module.exports = router