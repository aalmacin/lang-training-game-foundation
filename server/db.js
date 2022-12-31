import sqlite3 from "sqlite3"


export const connectDB = () => {
    const sqlite = sqlite3.verbose();
    return new sqlite.Database('./db/game.db', (err) => {
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

export const createGuessesTable = () => {
    const db = connectDB()
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS guesses
                (
                    id
                    INTEGER
                    PRIMARY
                    KEY
                    AUTOINCREMENT,
                    guess
                    TEXT
                    NOT
                    NULL,
                    sender
                    TEXT
                    NOT
                    NULL
                )`, (err) => {
            if (err) {
                console.error("getGuesses failed")
                console.error(err.message);
            }
            console.log('Created guesses table.');
        })
    })
    closeDB(db)
}

export async function insertGuess(guess, sender) {
    return new Promise((resolve, reject) => {
        const db = connectDB()
        db.serialize(() => {
            db.run(`INSERT INTO guesses (guess, sender)
                    VALUES ('${guess}', '${sender}')`,
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

export async function getGuesses() {
    return new Promise(
        (resolve, reject) => {
            const db = connectDB()
            db.serialize(() => {
                db.all(`SELECT *
                        FROM guesses`, (err, rows) => {
                    if (err) {
                        console.error("getGuesses failed")
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

export function seedSentences() {
    const db = connectDB()
    const sentences = [
        ''
    ];
    db.serialize(() => {
        db.run(`INSERT INTO sentences (text)
                VALUES ('I am a sentence.')`, (err) => {
            if (err) {
                console.error("seedSentences failed")
                console.error(err.message);
            }
            console.log('Seeded sentences table.');
        })
    })
    closeDB(db)
}
export async function getSentences() {
    return new Promise(
        (resolve, reject) => {
            const db = connectDB()
            db.serialize(() => {
                db.all(`SELECT *
                        FROM sentences`, (err, rows) => {
                    if (err) {
                        console.error("getSentences failed")
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
