import http from "http";
import express from "express";
import {Server} from "socket.io";
import cors from "cors";
import {createGuessesTable, insertGuess, getGuesses} from "./db.js";

const app = express();

app.use(cors());
createGuessesTable();

const server = http.createServer(app);
const whitelist = ["http://localhost:3000", "http://192.168.234.162:3000"];
const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        methods: ['GET', 'POST']
    }
});

const updateGuessList = (socket) => {
    getGuesses().then((guesses) => {
        // Broadcast using io
        io.emit("received_guess", guesses)
    });
}


io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    updateGuessList(socket);
    socket.on("send_guess", ({guess, sender}) => {
        insertGuess(guess, sender).then(() => {
            updateGuessList(socket);
        }).catch(err => console.error(err.message))
    });
});

io.on('player_join', (socket) => {
    updateGuessList(socket);
    socket.on("send_guess", ({guess, sender}) => {
        insertGuess(guess, sender).then(() => {
            updateGuessList(socket);
        }).catch(err => console.error(err.message))
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});