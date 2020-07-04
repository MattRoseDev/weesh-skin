import React from 'react'
import EditProfileContainer from './EditProfileContainer'
import EditProfileProvider from 'Root/contexts/editProfile'

export default props => {
    return (
        <EditProfileProvider>
            <EditProfileContainer {...props} />
        </EditProfileProvider>
    )
}
