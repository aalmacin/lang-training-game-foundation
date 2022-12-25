import './App.css';
import {UserProvider} from "./UserContext";
import {PageRouter} from "./PageRouter";

function App() {
    return (<UserProvider>
        <div className="p-3">
            <PageRouter />
        </div>
    </UserProvider>);
}

export default App;
