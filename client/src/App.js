import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
    const clickHandler = () => {
        socket.emit('send_message', {
            message: 'Hello from client'
        });
    }
    return (
        <div className="App">
            <input placeholder="Set Message"/>
            <button onClick={clickHandler}>Send</button>
        </div>
    );
}

export default App;
