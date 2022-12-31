import React, {useContext, useEffect, useState} from 'react';
import io from "socket.io-client";
import {UserContext} from "./UserContext";
import {Logout} from "./Logout";

export function Game() {
    const [socket, setSocket] = useState(null);
    const [guesses, setMessages] = useState([])
    const [guess, setGuess] = useState("")

    const {state: {username}} = useContext(UserContext);

    useEffect(() => {
        if (!socket) {
            setSocket(io('http://localhost:3001'))
        }
    }, [socket])
    const clickHandler = () => {
        socket.emit('send_guess', {
            guess,
            sender: username
        });
        setGuess("")
    }
    if (socket) {
        socket.on("received_guess", (receivedMsgs) => {
            setMessages(receivedMsgs)
        })
    }

    const changeHandler = (e) => {
        setGuess(e.target.value)
    }

    return (
        <div>
            <h1>Game</h1>
            <Logout />
            <h2>Welcome to the game {username}</h2>
            <textarea
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Set Message" onChange={changeHandler} value={guess} />
            <button
                rows="2"
                className="text-white w-full mt-2.5 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={clickHandler}>Send
            </button>

            {guesses.map(({id, guess, sender}) => <div
                className="block p-2.5 w-full text-md border mb-1"
                key={id}>
                <p className="text-md">{guess}</p>
                <p className="mt-2 text-sm">sent by {sender}</p>
            </div>)}
        </div>
    );
}