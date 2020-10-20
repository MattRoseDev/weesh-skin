import React from "react"
import { weeshReducer } from "Root/reducers/weesh"

export const WeeshContext = React.createContext()

const initialWeesh = {
    id: null,
    childId: null,
    store: {
        state: null,
        setState: null,
    },
    content: "",
    status: null,
    characterCount: 0,
    totalCount: 340,
    suggestions: [],
    defaultSuggestions: [],
    suggestionType: null,
    allowShowSuggestions: true,
}

const WeeshProvider = props => {
    const [weesh, dispatch] = React.useReducer(weeshReducer, initialWeesh)

    return (
        <WeeshContext.Provider value={{ weesh, dispatch }}>
            {props.children}
        </WeeshContext.Provider>
    )
}

export default WeeshProvider
