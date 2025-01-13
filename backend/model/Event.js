const { initializeDatabase } = require('../util/db.js');
const db = initializeDatabase();
const Event = {
    create: ({ name, date, location, maxAttendees, createdBy }, callback) => {
        const query = `
            INSERT INTO events (name, date, location, maxAttendees, createdBy)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.run(query, [name, date, location, maxAttendees, createdBy], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { id: this.lastID, name, date, location, maxAttendees, createdBy });
        });
    },

    findById: (id, callback) => {
        const query = `
            SELECT * FROM events
            WHERE id = ?
        `;
        db.get(query, [id], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    },

    findAll: (callback) => {
        const query = `
            SELECT * FROM events
        `;
        db.all(query, [], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    },

    updateById: (id, { name, date, location, maxAttendees }, callback) => {
        const query = `
            UPDATE events
            SET name = ?, date = ?, location = ?, maxAttendees = ?
            WHERE id = ?
        `;
        db.run(query, [name, date, location, maxAttendees, id], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { changes: this.changes });
        });
    },

    deleteById: (id, callback) => {
        const query = `
            DELETE FROM events
            WHERE id = ?
        `;
        db.run(query, [id], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { changes: this.changes });
        });
    }
};

module.exports = Event;