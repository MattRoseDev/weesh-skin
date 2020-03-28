import React from 'react'
import { weeshPageReducer } from 'Root/reducers/weeshPage'

export const WeeshPageContext = React.createContext()

const initialWeeshPage = {
    content: '',
    status: null,
    characterCount: 0,
    totalCount: 280,
}

const WeeshPageProvider = (props) => {
    const [weeshPage, dispatch] = React.useReducer(weeshPageReducer, initialWeeshPage)
    
    return <WeeshPageContext.Provider value={{ weeshPage, dispatch }}>
        {props.children}
    </WeeshPageContext.Provider>
}

export default WeeshPageProvider