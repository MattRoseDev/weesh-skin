import React from 'react'
import { AuthContext } from 'Root/contexts/auth'
import { UserContext } from 'Root/contexts/user'
import Button from 'Root/components/global/Button'
import ConnectionButton from './ConnectionButton'
import { Components } from 'Root/StyledComponents'
import C from 'Root/constants'

const handleStatus = (props, auth, user) => {
    if (!auth.token) {
        return (
            <Button
                color='primary'
                hoverbackground='lightPrimary'
                bordercolor='primary'
                borderwidth='1px'
                radius='50rem'
                padding='.5rem 1.25rem'
                fontWeight='bold'
                to='/login'
                width='6rem'>
                Follow
            </Button>
        )
    }

    if (props.match.params.username == auth.username) {
        return (
            <Button
                radius='50rem'
                color='primary'
                hoverbackground='lightPrimary'
                bordercolor='primary'
                borderwidth='1px'
                padding='.5rem 1.125rem'
                fontWeight='bold'
                to='settings/profile'
                width='6rem'>
                Settings
                {auth.isNewTicketMessage && (
                    <Components.Global.Badge margin='0 0 0 .5rem' />
                )}
            </Button>
        )
    }

    if (user.connection) {
        const { status } = user.connection

        switch (status) {
            case 0:
                return (
                    <ConnectionButton type='FOLLOW'>
                        {C.txts.en.connections.buttonStatus.FOLLOW}
                    </ConnectionButton>
                )
            case 1:
                return (
                    <ConnectionButton type='REQUEST'>
                        {C.txts.en.connections.buttonStatus.REQUEST}
                    </ConnectionButton>
                )
            case 2:
                return (
                    <ConnectionButton type='FOLLOWING'>
                        {C.txts.en.connections.buttonStatus.FOLLOWING}
                    </ConnectionButton>
                )
        }
    }
}

export default props => {
    const { auth } = React.useContext(AuthContext)
    const { user } = React.useContext(UserContext)
    return handleStatus(props, auth, user)
}
