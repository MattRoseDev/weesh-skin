import React from 'react'
import EditProfileContainer from './EditProfileContainer'
import UserProvider from 'Root/contexts/user'
import EditProfileProvider from 'Root/contexts/editProfile'

export default (props) => {
    return <UserProvider>
        <EditProfileProvider>
            <EditProfileContainer {...props}/>
        </EditProfileProvider>
    </UserProvider>
}