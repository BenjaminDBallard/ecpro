const Material = require('../models/Material')

exports.getAllMaterials = async (req, res, next) => {
    try {
        const [materials, _] = await Material.findAll()

        res.status(200).json({materials})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.createNewMaterial = async (req, res, next) => {
    try {
        let { 
            job_id,
            name,
            product_id,
            upc,
            brand,
            price,
            description,
            quantity 
        } = req.body

    let material = new Material(
        job_id,
        name,
        product_id,
        upc,
        brand,
        price,
        description,
        quantity
        )

    material = await material.save()

    res.status(201).json({message: "material created"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}
exports.getMaterialById = async (req, res, next) => {
    try {
        let materialId = req.params.id

        let [material, _] = await Material.findById(materialId)

        res.status(200).json({ material: material[0] })
    } catch (error) {
        console.log(error)
        next(error)
    }
}