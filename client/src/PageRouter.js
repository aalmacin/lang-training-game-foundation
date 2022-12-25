import {Game} from "./Game";
import {User} from "./User";
import {useContext, useEffect} from "react";
import {SET_USERNAME, UserContext} from "./UserContext";
import {Admin} from "./Admin";

export const PageRouter = () => {
    const {dispatch} = useContext(UserContext);
    useEffect(() => {
        const storageUsername = localStorage.getItem("username");
        if (storageUsername) {
            dispatch({type: SET_USERNAME, payload: storageUsername});
        }
    }, []);
    const {state: {username}} = useContext(UserContext);
    if (!username) {
        return <User />;
    }

    if (username === "AJ") {
        return <Admin />;
    }

    return <Game />;
}