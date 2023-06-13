const express = require("express")
const jobsController = require("../controllers/jobsController")
const router = express.Router()

// @route GET && POST - /jobs/
router
    .route("/")
    .get(jobsController.getAllJobs)
    .post(jobsController.createNewJob)

router.route("/:id").get(jobsController.getJobById)

module.exports = router