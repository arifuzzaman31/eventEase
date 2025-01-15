const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

let dbInstance;

const initializeDatabase = () => {
    if (dbInstance) {
        console.log('Using existing database connection.');
        return dbInstance;
    }
    const dbDir = path.resolve(__dirname, '../database');
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }
    const dbPath = path.resolve(dbDir, 'eventEase.db');

    dbInstance = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to the SQLite database.');
        }
    });

    dbInstance.serialize(() => {
        dbInstance.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT UNIQUE,
            password TEXT
        )`);

        dbInstance.run(`CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            date TEXT,
            location TEXT,
            maxAttendees INTEGER,
            createdBy INTEGER,
            FOREIGN KEY (createdBy) REFERENCES users(id)
        )`);
    });
    return dbInstance;
};

module.exports = { initializeDatabase };