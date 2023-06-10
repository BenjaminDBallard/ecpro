const User = require('../models/User')

exports.getAllUsers = async (req, res, next) => {
    try {
        const [user, _] = await User.findAll()

        res.status(200).json({user})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.createNewUser = async (req, res, next) => {
    try {
        let { firstName, lastName } = req.body
    let user = new User("firstName", "lastName")

    user = await user.save()

    res.status(201).json({message: "User created"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        let userId = req.params.id

        let [user, _] = await User.findById(userId)

        res.status(200).json({ user: user[0] })
    } catch (error) {
        console.log(error)
        next(error)
    }
}