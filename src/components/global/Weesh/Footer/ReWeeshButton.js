import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import Avatar from 'Root/components/global/Avatar'
import Icon from 'Root/components/global/Icon'
import DrawerDialog from 'Root/components/global/DrawerDialog'
import Dialog, { DialogButton } from 'Root/components/global/Dialog'
import StyledComponents, { Components } from 'Root/StyledComponents'
import moment from 'moment'
import FullName from 'Root/components/global/FullName'
import helpers from 'Root/helpers'
import useHistory from 'Root/hooks/useHistory'
import { useMutation } from '@apollo/react-hooks'
import api from 'Root/api'
import { AuthContext } from 'Root/contexts/auth'
import { SnackBarContext } from 'Root/contexts/snackbar'
import { DrawerDialogContext } from 'Root/contexts/drawerDialog'

const StyledHeader = styled.div`
    padding: 0.75rem 0.75rem 0;
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
`

const StyledNameContainer = styled.div`
    ${C.styles.flex.flexColumn};
    margin: 0 0 0 0.5rem;
`

const StyledUsername = styled.small`
    ${C.styles.flex.flexRow};
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.dark};
`

const StyledLeftSide = styled.div`
    ${C.styles.flex.flexRow};
`

const StyledIcon = styled.span`
    cursor: pointer;
`

const StyledTextArea = styled.textarea`
    height: 0;
    width: 0;
    resize: none;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.background};
`

const StyledHeaderDialog = styled.div`
    ${C.styles.flex.flexColumnCenter};
`

const StyledHeaderDialogMessage = styled.strong`
    color: ${({ theme }) => theme.colors.foreground};
    padding: 1rem 0;
`

const initialDialog = {
    visible: false,
}

export default props => {
    const { auth } = React.useContext(AuthContext)
    const [dialog, setDialog] = React.useState(initialDialog)
    const { drawerDialog, dispatch: drawerDialogDispatch } = React.useContext(
        DrawerDialogContext,
    )
    const { snackbar, dispatch: snackbarDispatch } = React.useContext(
        SnackBarContext,
    )

    const [addWeesh, addWeeshResponse] = useMutation(api.weeshes.add)
    const [undoReweesh, undoReweeshResponse] = useMutation(
        api.weeshes.undoReweesh,
    )

    const textarea = React.useRef()
    const history = useHistory()
    let buttons = [
        {
            label: props.isReweeshed ? 'Undo Reweesh' : 'ReWeesh',
            icon: 'Repeat',
            color: 'foreground',
            clickEvent: () => {
                drawerDialogDispatch({
                    type: 'HIDE',
                })
                if (props.isReweeshed) {
                    props.setIsReweeshed(false)
                    undoReweesh({
                        variables: {
                            weeshId: props.content
                                ? `${props.isReweeshed.id}`
                                : `${props.id}`,
                        },
                    })
                } else {
                    toggleDialog(true)
                }
            },
            // fontWeight: 'bold',
        },
        {
            label: 'ReWeesh with comment',
            icon: 'Edit',
            color: 'foreground',
            clickEvent: () => {
                if (props.content) {
                    history.push(`/compose/weesh?childId=${props.link}`)
                } else {
                    history.push(`/compose/weesh?childId=${props.child.link}`)
                }
            },
            // fontWeight: 'bold',
            border: 'dashed',
        },
        {
            label: 'Cancel',
            color: 'foreground',
            clickEvent: () => toggleDrawerDialog(false),
            // fontWeight: 'bold',
            border: 'dashed',
        },
    ]

    const handleAddWeesh = status => {
        toggleDialog(false)
        addWeesh({
            variables: {
                childId: props.content ? `${props.id}` : `${props.child.id}`,
                status,
            },
        })
        history.push(`/${auth.username}`)
        snackbarDispatch({
            type: 'SET_DATA',
            data: {
                icon: 'Repeat',
                message: 'This weesh reweeshed successfully.',
                background: 'foreground',
                visible: true,
            },
        })
        setTimeout(() => {
            snackbarDispatch({ type: 'HIDE' })
        }, 2 * 1000)
    }

    const toggleDrawerDialog = visible => {
        drawerDialogDispatch({
            type: visible ? 'SHOW' : 'HIDE',
        })
    }

    const shareOptions = [
        {
            title: C.txts.en.addWeesh.public,
            icon: 'Globe',
            status: 3,
        },
        {
            title: C.txts.en.addWeesh.private,
            icon: 'Users',
            status: 2,
        },
        {
            title: C.txts.en.addWeesh.secret,
            icon: 'User',
            status: 1,
        },
    ]

    const toggleDialog = visible => {
        setDialog(prevState => ({
            ...prevState,
            visible,
        }))
    }

    React.useEffect(() => {
        if (undoReweeshResponse.data) {
            history.push(`/${auth.username}`)
            snackbarDispatch({
                type: 'SET_DATA',
                data: {
                    icon: 'Trash2',
                    message: 'Reweeshed removed successfully.',
                    background: 'foreground',
                    visible: true,
                },
            })
            setTimeout(() => {
                snackbarDispatch({ type: 'HIDE' })
            }, 2 * 1000)
        }
    }, [undoReweeshResponse.data])

    React.useEffect(() => {
        if (props.visible != undefined) {
            toggleDrawerDialog(props.visible)
        }
    }, [props.visible])

    return (
        <>
            <Dialog
                width='19rem'
                padding='.5rem'
                contentPosition='top'
                {...dialog}
                toggleDialogFunction={visible => toggleDialog(visible)}>
                <StyledComponents.Dialog.Header.Container>
                    <StyledComponents.Dialog.Header.Message
                        padding='1rem'
                        fontWeight='bold'>
                        {C.txts.en.addWeesh.shareQuestion}
                    </StyledComponents.Dialog.Header.Message>
                </StyledComponents.Dialog.Header.Container>
                <StyledComponents.Share.Container>
                    {shareOptions.map(item => (
                        <StyledComponents.Share.Item
                            onClick={() => handleAddWeesh(item.status)}>
                            <Icon
                                icon={item.icon}
                                color={auth.color}
                                size={30}
                            />
                            <StyledComponents.Share.ItemTitle>
                                {item.title}
                            </StyledComponents.Share.ItemTitle>
                        </StyledComponents.Share.Item>
                    ))}
                </StyledComponents.Share.Container>
            </Dialog>
            <DrawerDialog
                width={window.innerWidth < 960 ? '100%' : '30%'}
                buttons={buttons}
                toggleDialogFunction={visible => toggleDrawerDialog(visible)}
            />
        </>
    )
}
