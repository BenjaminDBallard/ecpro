const db = require("../config/db")
class Job {
    constructor(
        client_id,
        name,
        address,
        status,
        industry
    )
    {
        this.client_id = client_id
        this.name = name
        this.address = address
        this.status = status
        this.industry = industry
    }

    save() {
        let sql = `
        INSERT INTO jobs(
            client_id,
            name,
            address,
            status,
            industry
        )
        VALUES(
            '${this.client_id}',
            '${this.name}',
            '${this.address}',
            '${this.status}',
            '${this.industry}'
        );
        `;

        return db.execute(sql)
    }

    static findAll() {
        let sql = "SELECT * FROM jobs;"

        return db.execute(sql)
    }

    static findById(id) {
        let sql = `SELECT * FROM jobs where id=${id};`

        return db.execute(sql)
    }
}

module.exports = Job