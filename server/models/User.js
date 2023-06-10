const db = require("../config/db")
class User {
    constructor(firstName, lastName) {
        this.firstName = firstName
        this.lastName = lastName
    }

    save() {
        let sql = `
        INSERT INTO user(
            first_name,
            last_name
        )
        VALUES(
            '${this.firstName}',
            '${this.lastName}'
        )
        `;

        return db.execute(sql)
    }

    static findAll() {
        let sql = "SELECT * FROM user;"

        return db.execute(sql)
    }

    static findById(id) {
        let sql = `SELECT * FROM user where id=${id};`

        return db.execute(sql)
    }
}

module.exports = User