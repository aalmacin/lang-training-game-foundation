import React, {useContext, useState} from "react";
import {SET_USERNAME, UserContext} from "./UserContext";

export const User = () => {
    const {dispatch} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const nameHandler = (e) => {
        setUsername(e.target.value);
    }

    const clickHandler = () => {
        dispatch({type: SET_USERNAME, payload: username});
        localStorage.setItem("username", username);
    }

    return (
        <div className="flex">
            <div className="flex flex-col items-center">
                <h1>What is your name?</h1>
                <input className="border my-2" onChange={nameHandler}/>
                <button onClick={clickHandler}>Enter</button>
            </div>
        </div>
    );
}