const express = require("express")
const clientsController = require("../controllers/clientsController")
const router = express.Router()

// @route GET && POST - /clients/
router
    .route("/")
    .get(clientsController.getAllClients)
    .post(clientsController.createNewClient)

router.route("/:id").get(clientsController.getClientById)

module.exports = router