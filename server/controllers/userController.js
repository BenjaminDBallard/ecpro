exports.getAllUsers = async (req, res, next) => {
    res.send("Get all user route")
}

exports.createNewUser = async (req, res, next) => {
    res.send("Create new user route")
}

exports.getUserById = async (req, res, next) => {
    res.send("Get user by id route")
}