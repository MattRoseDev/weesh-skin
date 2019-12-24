import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Client from './client'

const routes = [
    {
        key: 'home',
        path: '/',
        component: Client,
    },
]

const App = () => {
    return <Switch>
        <>
            {routes.map(route => <Route {...route}/>)}
        </>
    </Switch>
}

export default App