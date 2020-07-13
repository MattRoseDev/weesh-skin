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
    ${C.styles.flex.flexColumnCenter};
    padding: 2rem 0 1rem;
`

const StyledHeaderDialogMessage = styled.div`
    color: ${({ theme }) => theme.colors.foreground};
    padding: 1rem 0 0;
`

const StyledUsername = styled.strong`
    color: ${({ theme }) => theme.colors.foreground};
    color: inherit;
`

const initialDialog = {
    visible: false,
}

export default props => {
    const { user, dispatch: userDispatch } = React.useContext(UserContext)
    const { auth, dispatch: authDispatch } = React.useContext(AuthContext)
    const [variables, setVariables] = React.useState({ userId: user.id })
    const [dialog, setDialog] = React.useState(initialDialog)
    const history = useHistory()

    const {
        apiType,
        dataType,
        messageType,
        acceptButtonType,
        cancelButtonType,
    } = switchAPI(props.type)

    const [connection, { data, error, loading }] = useMutation(
        api.connections[apiType],
    )

    React.useEffect(() => {
        if (error) {
            console.log(error)
        }
        if (data) {
            const result = data[dataType]
            userDispatch({
                type: 'ADD_USER_DATA',
                data: {
                    ...user,
                    connection: {
                        ...user.connection,
                        status: result.status,
                    },
                    followers: {
                        paginate: {
                            totalDocs: handleNumber(
                                props.type,
                                user.followers.paginate.totalDocs,
                                result,
                            ),
                        },
                    },
                },
            })
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
                        key={uuid()}>{`${user.username}`}</StyledUsername>
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
                toggleDialogFunction={visible => toggleDialog(visible)}>
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
                    color='red'>
                    {acceptButtonType}
                </DialogButton>
                <DialogButton
                    fontWeight='bold'
                    onClick={() => toggleDialog(false)}>
                    {cancelButtonType}
                </DialogButton>
            </Dialog>
            <Button
                color={auth.color}
                hoverbackground='lightPrimary'
                bordercolor='primary'
                borderwidth='1px'
                fontWeight='bold'
                isLoading={loading || undefined}
                onClick={() => {
                    if (props.type == 'FOLLOWING') toggleDialog(true)
                    else handleConnection()
                }}
                padding='.5rem .75rem'
                radius='50rem'
                width='6rem'>
                {props.children}
            </Button>
        </>
    )
}

const handleNumber = (type, number, result) => {
    switch (type) {
        case 'FOLLOW':
            return result.status == 2 ? number + 1 : number
        case 'FOLLOWING':
            return number > 0 ? number - 1 : 0
        case 'REQUEST':
            return number
    }
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
