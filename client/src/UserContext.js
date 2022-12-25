import React, {useReducer} from "react";

export const initialUserContext = {
    state: {username: null},
    dispatch: () => {}
}

export const UserContext = React.createContext(initialUserContext);

export const SET_USERNAME = "SET_USERNAME";
export const CLEAR_USERNAME = "CLEAR_USERNAME";

export const userReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case SET_USERNAME:
            return {
                ...state,
                username: payload
            }
        case CLEAR_USERNAME:
            return {
                ...state,
                username: null
            }
        default:
            throw new Error(`Unhandled action type: ${type}`)
    }
}

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(
        userReducer,
        initialUserContext,
        (initialState) => initialState
    );
    const value = {state, dispatch};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}