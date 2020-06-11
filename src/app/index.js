import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Client from './client'
import { ApolloProvider } from '@apollo/react-hooks'
import apollo from 'Root/apollo'
import AuthProvider from 'Root/contexts/auth'
import AlertProvider from 'Root/contexts/alert'
import SnackBarProvider from 'Root/contexts/snackbar'
import NotificationProvider from 'Root/contexts/notifications'
import uuid from 'uuid'

const routes = [
    {
        key: 'home',
        path: '/',
        component: Client,
    },
]

export default () => {
    return <Switch>
        <AuthProvider>
            <NotificationProvider>
                <SnackBarProvider>
                    <AlertProvider>
                        <ApolloProvider client={apollo}>
                            {routes.map(route => <Route key={uuid()} {...route} />)}
                        </ApolloProvider>
                    </AlertProvider>
                </SnackBarProvider>
            </NotificationProvider>
        </AuthProvider>
    </Switch>
}