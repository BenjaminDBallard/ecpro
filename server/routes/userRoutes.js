const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()

// @route GET && POST - /user/
router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createNewUser)

router.route("/:id").get(userController.getUserById)

module.exports = router