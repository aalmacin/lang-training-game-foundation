import React, {useReducer} from "react";

export const initialGameContext = {
    state: {sentence: null, players: [], guesses: []},
    dispatch: () => {}
}

export const GameContext = React.createContext(initialGameContext);

export const SET_SENTENCE = "SET_SENTENCE";
export const CLEAR_SENTENCE = "CLEAR_SENTENCE";

export const gameReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case SET_SENTENCE:
            return {
                ...state,
                sentence: payload
            }
        case CLEAR_SENTENCE:
            return {
                ...state,
                sentence: null
            }
        default:
            throw new Error(`Unhandled action type: ${type}`)
    }
}

export const GameProvider = ({children}) => {
    const [state, dispatch] = useReducer(
        gameReducer,
        initialGameContext,
        (initialState) => initialState
    );
    const value = {state, dispatch};
    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}