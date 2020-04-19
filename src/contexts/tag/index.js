import React from 'react'
import { tagReducer } from 'Root/reducers/tag'

export const TagContext = React.createContext()

const initialTag = null

const TagProvider = (props) => {
    const [tag, dispatch] = React.useReducer(tagReducer, initialTag)
   
    return <TagContext.Provider value={{ tag, dispatch }}>
        {props.children}
    </TagContext.Provider>
}

export default TagProvider