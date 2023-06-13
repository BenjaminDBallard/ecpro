const db = require("../config/db")
class Material {
    constructor(
        job_id,
        name,
        product_id,
        upc,
        brand,
        price,
        description,
        quantity
    )
    {
        this.job_id = job_id
        this.name = name
        this.product_id = product_id
        this.upc = upc
        this.brand = brand
        this.price = price
        this.description = description
        this.quantity = quantity
    }

    save() {
        let sql = `
        INSERT INTO materials(
            job_id,
            name,
            product_id,
            upc,
            brand,
            price,
            description,
            quantity
        )
        VALUES(
            '${this.job_id}',
            '${this.name}',
            '${this.product_id}',
            '${this.upc}',
            '${this.brand}',
            '${this.price}',
            '${this.description}',
            '${this.quantity}'
        );
        `;

        return db.execute(sql)
    }

    static findAll() {
        let sql = "SELECT * FROM materials;"

        return db.execute(sql)
    }

    static findById(id) {
        let sql = `SELECT * FROM materials where id=${id};`

        return db.execute(sql)
    }
}

module.exports = Material