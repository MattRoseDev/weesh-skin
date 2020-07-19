import React from 'react'
import { weeshReducer } from 'Root/reducers/weesh'

export const WeeshContext = React.createContext()

const initialWeesh = {
    id: null,
    content: '',
    status: null,
    characterCount: 0,
    totalCount: 280,
    suggestionTags: [],
    allowShowSuggestions: true,
    textarea: null,
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
