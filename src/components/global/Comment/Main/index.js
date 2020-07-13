import React from 'react'
import styled, { css } from 'styled-components'
import Comment from 'Root/components/global/Comment'
import Dialog, { DialogButton } from 'Root/components/global/Dialog'
import uuid from 'uuid'
import { WeeshPageContext } from 'Root/contexts/weeshPage'
import { AuthContext } from 'Root/contexts/auth'
import moment from 'moment'
import helpers from 'Root/helpers'
import C from 'Root/constants'
import { useMutation } from '@apollo/react-hooks'
import api from 'Root/api'
import Link from 'Root/components/global/Link'
import Icon from 'Root/components/global/Icon'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumn};
    width: 100%;
    ${({ isChild }) =>
        !isChild &&
        css`
            padding: 0.75rem 0 0;
        `};
`

const StyledMain = styled.p`
    color: ${({ theme }) => theme.colors.foreground};
    font-size: .85rem;
    /* ${({ isChild }) =>
        isChild
            ? css`
                  padding: 0 0.75rem 0.25rem;
              `
            : css` */
        padding: .25rem .75rem .25rem;
    /* `}; */
    line-height: 1.125rem;
    white-space: pre-wrap;
    word-break: break-word;
`

const StyledUsername = styled.strong`
    font-size: 0.85rem;
    padding: 0 0.25rem 0 0;
    color: ${({ theme }) => theme.colors.foreground};
`

const StyledChild = styled.div``

const StyledFooter = styled.div`
    display: flex;
    align-items: center;
    padding: 0 0.5rem 0.75rem 0.75rem;
`

const StyledButton = styled.button`
    display: flex;
    color: ${({ theme, color }) => theme.colors[color]};
    background: none;
    border: none;
    font-weight: bold;
    font-size: 0.75rem;
    margin: 0 0 0 0.75rem;
    padding: 0;
    cursor: pointer;
`

const StyledLink = styled(Link)`
    display: flex;
    color: ${({ theme, color }) => theme.colors[color]};
    background: none;
    border: none;
    font-weight: bold;
    font-size: 0.75rem;
    margin: 0 0 0 0.75rem;
    padding: 0;
    cursor: pointer;
`

const StyledButtonIcon = styled.span`
    display: flex;
    align-items: center;
    padding: 0 0.2rem 0 0;
`

const StyledDate = styled.span`
    color: ${({ theme }) => theme.colors.gray};
    font-size: 0.75rem;
`

const StyledHeaderDialog = styled.div`
    color: ${({ theme }) => theme.colors.foreground};
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
    const [dialog, setDialog] = React.useState(initialDialog)
    const { auth } = React.useContext(AuthContext)
    const { weeshPage, dispatch: weeshPageDispatch } = React.useContext(
        WeeshPageContext,
    )
    const [removeWeeshComment, { data, error, loading, called }] = useMutation(
        api.weeshComments.remove,
        {
            variables: {
                commentId: `${props.id}`,
            },
        },
    )

    const handleReply = () => {
        weeshPageDispatch({
            type: 'SET_REPLY',
            data: props,
        })
        weeshPage.textarea.current.focus()
    }

    const handleRemove = () => {
        toggleDialog(true)
    }

    React.useEffect(() => {
        if (data) {
            props.commentRef.current.remove()
        }
    }, [data])

    const toggleDialog = visible => {
        setDialog(prevState => ({
            ...prevState,
            visible,
        }))
    }

    return (
        <StyledContainer {...props}>
            <Dialog
                width='18rem'
                {...dialog}
                toggleDialogFunction={visible => toggleDialog(visible)}>
                <StyledHeaderDialog>
                    <StyledHeaderDialogMessage>
                        Delete your Comment?
                    </StyledHeaderDialogMessage>
                </StyledHeaderDialog>
                <DialogButton
                    onClick={() => {
                        removeWeeshComment()
                        toggleDialog(false)
                    }}
                    fontWeight='bold'
                    color='red'>
                    Delete
                </DialogButton>
                <DialogButton
                    fontWeight='bold'
                    onClick={() => toggleDialog(false)}>
                    Cancel
                </DialogButton>
            </Dialog>
            <StyledMain>
                <Link to={`/${props.user.username}`}>
                    <StyledUsername {...props}>
                        {props.user.username}
                    </StyledUsername>
                </Link>
                {props.content}
            </StyledMain>
            <StyledFooter>
                <StyledDate>
                    {helpers.dateFormat(moment(props.createdAt).fromNow(true))}
                </StyledDate>
                {auth.token ? (
                    !props.isChild && (
                        <StyledButton onClick={handleReply} color='gray'>
                            <StyledButtonIcon>
                                <Icon
                                    icon='CornerUpRight'
                                    size={14}
                                    color='gray'
                                />
                            </StyledButtonIcon>
                            {C.txts.en.weeshPage.comment.reply}
                        </StyledButton>
                    )
                ) : (
                    <StyledLink to='/login' color='gray'>
                        <StyledButtonIcon>
                            <Icon icon='CornerUpRight' size={14} color='gray' />
                        </StyledButtonIcon>
                        {C.txts.en.weeshPage.comment.reply}
                    </StyledLink>
                )}
                {props.user.id == auth.id && (
                    <StyledButton onClick={handleRemove} color='red'>
                        <StyledButtonIcon>
                            <Icon icon='Trash2' size={14} color='red' />
                        </StyledButtonIcon>
                        {C.txts.en.weeshPage.comment.remove}
                    </StyledButton>
                )}
            </StyledFooter>
            <StyledChild>
                {props.children &&
                    props.children.weeshComments.length > 0 &&
                    props.children.weeshComments.map(comment => (
                        <Comment isChild={true} key={uuid()} {...comment} />
                    ))}
            </StyledChild>
        </StyledContainer>
    )
}
