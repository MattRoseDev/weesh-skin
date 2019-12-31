import React from 'react'
import { authReducer } from 'Root/reducers/auth'

export const AuthContext = React.createContext()

const initialAuth = {
    token: null
}

const AuthProvider = (props) => {
    const [auth, dispatch] = React.useReducer(authReducer, initialAuth)
    return <AuthContext.Provider value={{auth, dispatch}}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthProvider