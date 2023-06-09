const db = require("../config/db")
class Client {
    constructor(
        user_id,
        first_name,
        last_name,
        company,
        phone,
        email
    )
    {
        this.user_id = user_id
        this.first_name = first_name
        this.last_name = last_name
        this.company = company
        this.phone = phone
        this.email = email
    }

    save() {
        let sql = `
        INSERT INTO clients(
            user_id,
            first_name,
            last_name,
            company,
            phone,
            email
        )
        VALUES(
            '${this.user_id}',
            '${this.first_name}',
            '${this.last_name}',
            '${this.company}',
            '${this.phone}',
            '${this.email}'
        );
        `;

        return db.execute(sql)
    }

    static findAll() {
        let sql = "SELECT * FROM clients;"

        return db.execute(sql)
    }

    static findById(id) {
        let sql = `SELECT * FROM clients where id=${id};`

        return db.execute(sql)
    }
}

module.exports = Client