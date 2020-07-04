import React from 'react'
import { AuthContext } from 'Root/contexts/auth'
import { UserContext } from 'Root/contexts/user'
import useHistory from 'Root/hooks/useHistory'
import { useMutation } from '@apollo/react-hooks'
import Button from 'Root/components/global/Button'
import Dialog, { DialogButton } from 'Root/components/global/Dialog'
import Avatar from 'Root/components/global/Avatar'
import api from 'Root/api'
import styled from 'styled-components'
import C from 'Root/constants'
import uuid from 'uuid'

const StyledHeaderDialog = styled.div`
    color: ${({ theme }) => theme.colors.foreground};
    ${C.styles.flex.flexColumnCenter};
    padding: 2rem 0 1rem;
`

const StyledHeaderDialogMessage = styled.div`
    color: ${({ theme }) => theme.colors.foreground};
    text-align: center;
    padding: 1rem 0 0;
`

const StyledUsername = styled.strong`
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const initialDialog = {
    visible: false,
}

export default props => {
    const { user } = props
    const { auth } = React.useContext(AuthContext)
    const [variables, setVariables] = React.useState({ userId: user.id })
    const [dialog, setDialog] = React.useState(initialDialog)
    const [type, setType] = React.useState(props.type)
    const history = useHistory()

    const {
        apiType,
        dataType,
        messageType,
        acceptButtonType,
        cancelButtonType,
    } = switchAPI(type)

    const [connection, { data, error, loading }] = useMutation(
        api.connections[apiType],
    )

    React.useEffect(() => {
        if (error) {
            console.log(error)
        }
        if (data) {
            const result = data[dataType]
            switch (result.status) {
                case 0:
                    return setType('FOLLOW')
                case 1:
                    return setType('REQUEST')
                case 2:
                    return setType('FOLLOWING')
            }
        }
    }, [data])

    const handleConnection = () => connection({ variables })

    let dialogMessage
    if (messageType) {
        dialogMessage = messageType.split(/(\$.*.\$)/gi)
        dialogMessage = dialogMessage.map(item => {
            if (item == '$$username$$') {
                item = (
                    <StyledUsername
                        key={uuid()}
                    >{`${user.username}`}</StyledUsername>
                )
            }
            return item
        })
    }

    const toggleDialog = visible => {
        setDialog(prevState => ({
            ...prevState,
            visible,
        }))
    }

    return (
        <>
            <Dialog
                width='18rem'
                {...dialog}
                toggleDialogFunction={visible => toggleDialog(visible)}
            >
                <StyledHeaderDialog>
                    <Avatar size={4} user={user} />
                    <StyledHeaderDialogMessage>
                        {dialogMessage}
                    </StyledHeaderDialogMessage>
                </StyledHeaderDialog>
                <DialogButton
                    onClick={() => {
                        handleConnection()
                        toggleDialog(false)
                    }}
                    fontWeight='bold'
                    color='red'
                >
                    {acceptButtonType}
                </DialogButton>
                <DialogButton
                    fontWeight='bold'
                    onClick={() => toggleDialog(false)}
                >
                    {cancelButtonType}
                </DialogButton>
            </Dialog>
            {user.id != auth.id &&
                (type == 'FOLLOWING' ? (
                    <Button
                        background='background'
                        color='gray'
                        isLoading={loading || undefined}
                        onClick={() => {
                            if (type == 'FOLLOWING') toggleDialog(true)
                            else handleConnection()
                        }}
                        padding='.4rem .75rem'
                        radius='50rem'
                        width='6rem'
                        bordercolor='light'
                        borderwidth='1px'
                        loaderSize={16}
                        margin='0 .5rem 0 0'
                    >
                        {C.txts.en.connections.buttonStatus[type]}
                    </Button>
                ) : (
                    <Button
                        color='primary'
                        hoverbackground='lightPrimary'
                        bordercolor='primary'
                        borderwidth='1px'
                        fontWeight='bold'
                        isLoading={loading || undefined}
                        onClick={() => {
                            if (type == 'FOLLOWING') toggleDialog(true)
                            else handleConnection()
                        }}
                        padding='.4rem .75rem'
                        radius='50rem'
                        width='6rem'
                        loaderSize={16}
                        margin='0 .5rem 0 0'
                    >
                        {C.txts.en.connections.buttonStatus[type]}
                    </Button>
                ))}
        </>
    )
}

const switchAPI = type => {
    switch (type) {
        case 'FOLLOW':
            return {
                apiType: 'follow',
                dataType: 'followUserConnectionForUser',
            }
        case 'FOLLOWING':
            return {
                apiType: 'unfollow',
                dataType: 'unfollowUserConnectionForUser',
                messageType: 'Unfollow $$username$$?',
                acceptButtonType: 'Unfollow',
                cancelButtonType: 'Not Now',
            }
        case 'REQUEST':
            return {
                apiType: 'unfollow',
                dataType: 'unfollowUserConnectionForUser',
            }
    }
}
