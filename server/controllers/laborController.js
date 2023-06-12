const Labor = require('../models/Labor')

exports.getAllLabor = async (req, res, next) => {
    try {
        const [labor, _] = await Labor.findAll()

        res.status(200).json({labor})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.createNewLabor = async (req, res, next) => {
    try {
        let { firstName, lastName } = req.body
    let labor = new Labor("firstName", "lastName")

    labor = await Labor.save()

    res.status(201).json({message: "labor created"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.getLaborById = async (req, res, next) => {
    try {
        let laborId = req.params.id

        let [labor, _] = await Labor.findById(laborId)

        res.status(200).json({ labor: labor[0] })
    } catch (error) {
        console.log(error)
        next(error)
    }
}