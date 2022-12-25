import http from "http";
import express from "express";
import {Server} from "socket.io";
import cors from "cors";
import {createGuessesTable, insertGuess, getGuesses} from "./db.js";

const app = express();

app.use(cors());
createGuessesTable();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', methods: ['GET', 'POST']
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
        }).catch(err => console.error(err.guess))
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});