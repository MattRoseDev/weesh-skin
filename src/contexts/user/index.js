import React from 'react'
import { userReducer } from 'Root/reducers/user'

export const UserContext = React.createContext()

const initialUser = null

const UserProvider = props => {
    const [user, dispatch] = React.useReducer(userReducer, initialUser)

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider
