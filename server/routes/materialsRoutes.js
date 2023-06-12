const express = require("express")
const materialsController = require("../controllers/materialsController")
const router = express.Router()

// @route GET && POST - /materials/
router
    .route("/")
    .get(materialsController.getAllMaterials)
    .post(materialsController.createNewMaterial)

router.route("/:id").get(materialsController.getMaterialById)

module.exports = router