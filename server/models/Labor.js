const db = require("../config/db")
class Labor {
    constructor(
        job_id,
        job_title,
        pay_scale,
        quantity,
        hours
    )
    {
        this.job_id = job_id
        this.job_title = job_title
        this.pay_scale = pay_scale
        this.quantity = quantity
        this.hours = hours
    }
    
    save() {
        console.log("!!!!!!!!",this)
        let sql = `
        INSERT INTO labor(
            job_id,
            job_title,
            pay_scale,
            quantity,
            hours
        )
        VALUES(
            '${this.job_id}',
            '${this.job_title}',
            '${this.pay_scale}',
            '${this.quantity}',
            '${this.hours}'
        );
        `;

        return db.execute(sql)
    }

    static findAll() {
        let sql = "SELECT * FROM labor;"

        return db.execute(sql)
    }

    static findById(id) {
        let sql = `SELECT * FROM labor where id=${id};`

        return db.execute(sql)
    }
}

module.exports = Labor