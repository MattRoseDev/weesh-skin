import React from 'react'
import { weeshPageReducer } from 'Root/reducers/weeshPage'

export const WeeshPageContext = React.createContext()

const initialWeeshPage = {
    reply: null,
    textarea: null,
}

const WeeshPageProvider = props => {
    const [weeshPage, dispatch] = React.useReducer(
        weeshPageReducer,
        initialWeeshPage,
    )

    return (
        <WeeshPageContext.Provider value={{ weeshPage, dispatch }}>
            {props.children}
        </WeeshPageContext.Provider>
    )
}

export default WeeshPageProvider
