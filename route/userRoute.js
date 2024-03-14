const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");
const { authentication } = require('../middleware/auth.js')

//const { authentication, isAdmin } = require("../middlewares/authentication");



router.post("/register", userController.register);
router.post("/login", userController.login);
router.delete("/logout", authentication, userController.logout)

module.exports = router;
