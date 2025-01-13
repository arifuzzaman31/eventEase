const { initializeDatabase } = require('../util/db.js');
const db = initializeDatabase();
const User = {
    create: ({ username, email, password }, callback) => {
        const query = `
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        `;
        db.run(query, [username, email, password], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { id: this.lastID, username, email });
        });
    },

    findByEmail: (email, callback) => {
        const query = `
            SELECT * FROM users
            WHERE email = ?
        `;
        db.get(query, [email], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    },

    findAll: (callback) => {
        const query = `
            SELECT * FROM users
        `;
        db.all(query, [], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    }
};
module.exports = User;