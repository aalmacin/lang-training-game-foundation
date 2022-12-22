import http from "http";
import express from "express";
import {Server} from "socket.io";
import cors from "cors";
import {createMessagesTable, insertMessage, getMessages} from "./db.js";

const app = express();

app.use(cors());
createMessagesTable();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', methods: ['GET', 'POST']
    }
});

const updateMessageList = (socket) => {
    getMessages().then((messages) => {
        // Broadcast using io
        io.emit("received_message", messages)
    });
}

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    updateMessageList(socket);
    socket.on("send_message", ({message, sender}) => {
        insertMessage(message, sender).then(() => {
            updateMessageList(socket);
        }).catch(err => console.error(err.message))
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});