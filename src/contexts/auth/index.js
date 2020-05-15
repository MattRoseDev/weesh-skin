import React from 'react'
import { authReducer } from 'Root/reducers/auth'
import helpers from 'Root/helpers'

const { storage } = helpers
export const AuthContext = React.createContext()

const initialAuth = {
    token: storage.get({ key: 'token' }) || false,
    theme: storage.get({ key: 'theme' }) || 'light',
}

const AuthProvider = (props) => {
    const [auth, dispatch] = React.useReducer(authReducer, initialAuth)
    React.useEffect(() => {
        storage.set({ key: 'token', value: auth.token })
        storage.set({ key: 'theme', value: auth.theme })
    },[auth])
    return <AuthContext.Provider value={{auth, dispatch}}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthProvider