const express = require("express")
const laborController = require("../controllers/laborController")
const router = express.Router()

// @route GET && POST - /materials/
router
    .route("/")
    .get(laborController.getAllLabor)
    .post(laborController.createNewLabor)

router.route("/:id").get(laborController.getLaborById)

module.exports = router