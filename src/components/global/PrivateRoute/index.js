import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from 'Root/contexts/auth'

const PrivateRoute = (props) => {
    const { auth } = React.useContext(AuthContext)
    return auth.token ? <Route {...props} /> : <Redirect to='/login'/>
}

export default PrivateRoute