import React from 'react'
import UserContainer from './UserContainer'
import UserProvider from 'Root/contexts/user'

export default (props) => {
    return <UserProvider>
        <UserContainer {...props}/>
    </UserProvider>
}