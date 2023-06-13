const Client = require('../models/Client')

exports.getAllClients = async (req, res, next) => {
    try {
        const [clients, _] = await Client.findAll()

        res.status(200).json({clients})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.createNewClient = async (req, res, next) => {
    try {
        let { 
            user_id,
            first_name,
            last_name,
            company,
            phone,
            email 
        } = req.body

        console.log('????????????????????????????????')
        console.log(req.body)

    let client = new Client(
        user_id,
        first_name,
        last_name,
        company,
        phone,
        email
    )

    client = await client.save()

    res.status(201).json({message: "Client created"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.getClientById = async (req, res, next) => {
    try {
        let clientId = req.params.id

        let [client, _] = await Client.findById(clientId)

        res.status(200).json({ client: client[0] })
    } catch (error) {
        console.log(error)
        next(error)
    }
}