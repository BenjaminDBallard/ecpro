const Job = require('../models/Job')

exports.getAllJobs = async (req, res, next) => {
    try {
        const [jobs, _] = await Job.findAll()

        res.status(200).json({jobs})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.createNewJob = async (req, res, next) => {
    try {
        let { firstName, lastName } = req.body
    let job = new Job("firstName", "lastName")

    job = await Job.save()

    res.status(201).json({message: "job created"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.getJobById = async (req, res, next) => {
    try {
        let jobId = req.params.id

        let [job, _] = await Job.findById(jobId)

        res.status(200).json({ job: job[0] })
    } catch (error) {
        console.log(error)
        next(error)
    }
}