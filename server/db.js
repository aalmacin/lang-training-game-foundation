import sqlite3 from "sqlite3"

export const connectDB = () => {
    const sqlite = sqlite3.verbose();
    return new sqlite.Database('./db/chat.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the chat database.');
    });
}

export const closeDB = (db) => {
    db.close((err => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the chat database connection.');
    }))
}

export const createMessagesTable = () => {
    const db = connectDB()
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS messages
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    message TEXT NOT NULL,
                    sender TEXT NOT NULL
                )`, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Created messages table.');
        })
    })
    closeDB(db)
}