import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Template from './Template'
import routes from './routes'
import uuid from 'uuid'
import PrivateRoute from 'Root/components/global/PrivateRoute'
import { AuthContext } from 'Root/contexts/auth'

export default () => {
    const { auth, dispatch: authDispatch } = React.useContext(AuthContext)

    return (
        <Template>
            <Switch>
                {routes.map(route =>
                    route.private ? (
                        <PrivateRoute key={uuid()} {...route} />
                    ) : (
                        <Route key={uuid()} {...route} />
                    ),
                )}
            </Switch>
        </Template>
    )
}
