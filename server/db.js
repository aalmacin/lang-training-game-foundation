import sqlite3 from "sqlite3"


export const connectDB = () => {
    const sqlite = sqlite3.verbose();
    return new sqlite.Database('./db/chat.db', (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

export const closeDB = (db) => {
    db.close((err => {
        if (err) {
            console.error(err.message);
        }
    }))
}

export const createMessagesTable = () => {
    const db = connectDB()
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS messages
                (
                    id
                    INTEGER
                    PRIMARY
                    KEY
                    AUTOINCREMENT,
                    message
                    TEXT
                    NOT
                    NULL,
                    sender
                    TEXT
                    NOT
                    NULL
                )`, (err) => {
            if (err) {
                console.error("getMessages failed")
                console.error(err.message);
            }
            console.log('Created messages table.');
        })
    })
    closeDB(db)
}

export async function insertMessage(message, sender) {
    return new Promise((resolve, reject) => {
        const db = connectDB()
        db.serialize(() => {
            db.run(`INSERT INTO messages (message, sender)
                    VALUES ('${message}', '${sender}')`,
                (result, err) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                }
            )
        })
        closeDB(db)
    })
}

export async function getMessages() {
    return new Promise(
        (resolve, reject) => {
            const db = connectDB()
            db.serialize(() => {
                db.all(`SELECT *
                        FROM messages`, (err, rows) => {
                    if (err) {
                        console.error("getMessages failed")
                        reject(err.message)
                        throw err;
                    }
                    resolve(rows)
                })
            })
            closeDB(db)
        }
    );
}
