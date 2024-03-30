const express = require('express')
const router = express.Router()
const postController = require('../controller/postController')

const {  authentication,  isAuthorPost } = require('../middleware/auth')

router.get('/', postController.getAll)
router.post('/create', authentication, postController.create)
router.put('/update/id/:_id', authentication, postController.update)
router.delete('/delete/id/:_id', authentication, postController.delete)
router.get('/getById/id/:_id', postController.getById)
router.put('/like/id/:_id', authentication, postController.like)

module.exports = router 