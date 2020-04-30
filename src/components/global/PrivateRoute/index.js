import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from 'Root/contexts/auth'

const PrivateRoute = (props) => {
    const { auth, dispatch } = React.useContext(AuthContext)
    if(!auth.token) {
        dispatch({
            type: 'LOGOUT'
        })
    }
    return auth.token ? <Route {...props} /> : <Redirect to='/login'/>
}

export default PrivateRoute