import React from 'react';
import { Route, Switch } from 'react-router-dom';
export default (
    <Switch>
        <Route path='/login' />
        <Route path='/join' />
        <Route path='/:username' />
        <Route path='/w/:link' />
        <Route path='/t/:tagTitle' />
    </Switch>
)