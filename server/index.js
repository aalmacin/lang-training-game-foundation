import http from "http";
import express from "express";
import {Server} from "socket.io";
import cors from "cors";
import {createMessagesTable} from "./db.js";

const app = express();

app.use(cors());
createMessagesTable();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("send_message", () => {

    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});