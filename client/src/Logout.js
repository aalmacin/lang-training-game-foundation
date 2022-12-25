import React, {useContext} from "react";
import {CLEAR_USERNAME, UserContext} from "./UserContext";

export const Logout = () => {
    const {dispatch} = useContext(UserContext);
    const logout = () => {
        localStorage.removeItem("username");
        dispatch({type: CLEAR_USERNAME})
    }
    return <div>
        <a href="#" onClick={logout}>Logout</a>
    </div>;
}