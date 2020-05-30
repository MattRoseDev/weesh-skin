import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styled, { css } from 'styled-components'
import Avatar from 'Root/components/global/Avatar'
import Icon from 'Root/components/global/Icon'
import { AuthContext } from 'Root/contexts/auth'
import { WeeshPageContext } from 'Root/contexts/weeshPage'
import C from 'Root/constants'
import { useMutation } from '@apollo/react-hooks'
import api from 'Root/api'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsStart};
    padding: .5rem;
    position: sticky;
    top: ${window.innerWidth > 768 ? '54px' : '44px'};
    border-bottom: 1px dashed ${({ theme }) => theme.colors.light};
    background: ${({theme}) => theme.colors.background};
`

const StyledForm = styled.form`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.stretch};
    margin: 0 0 0 .5rem;
    padding: .5rem .75rem;
    border: 1px solid ${({theme}) => theme.colors.light};
    background: ${({theme}) => theme.colors.background};
    border-radius: .85rem;
`

const StyledFormContainer = styled.div`
    width: 100%;
`

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    height: 18px;
    line-height: 18px;
    resize: none;
    padding: 0;
    margin: 0;
    color: ${({ theme }) => theme.colors.foreground};
    background: transparent;
    border: none;
    white-space: pre-wrap;
`

const StyledButton = styled.button`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentEnd};
    ${({ disabled, theme }) => disabled ? css`
        color: ${({ theme }) => theme.colors.gray};
    ` : css`
        cursor: pointer;
        color: ${({ theme }) => theme.colors.primary};
    `};
    padding: 0 0 0 .5rem;
    font-size: .75rem;
    font-weight: bold;
    background: none;
    border: none;
`

const StyledReplyContainer = styled.span`
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsStretch};
    padding: 0 .5rem .5rem;
    font-size: .75rem;
`

const StyledReplyLabel = styled.span`
    color: ${({ theme }) => theme.colors.gray};
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsCenter};
`

const StyledReplyUsername = styled.strong`
    color: ${({ theme }) => theme.colors.dark};
    padding: 0 0 0 .25rem; 
`

const StyledReplyDiscardIcon = styled.span`
    padding: .25rem;
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsStretch};
    cursor: pointer;
`

export default (props) => {
    const { auth } = React.useContext(AuthContext)
    const { weeshPage, dispatch: weeshPageDispatch } = React.useContext(WeeshPageContext)
    const [state, setState] = React.useState('')
    const [addWeeshComment, { data, error, loading, called }] = useMutation(api.weeshComments.add)
    const textarea = React.useRef()
    
    const handleChange = (e) => setState(e.target.value)

    const handleAddWeeshComment = () => {
        addWeeshComment({
            variables: {
                content: state,
                weeshId: `${props.id}`,
                parentId: weeshPage.reply ? `${weeshPage.reply.parentId}` : null,
            }
        })
    }

    const handleDiscardReply = () => weeshPageDispatch({
        type: 'UNSET_REPLY',
    })

    React.useEffect(() => {
        if(!weeshPage.textarea) {
            weeshPageDispatch({
                type: 'SET_TEXTAREA',
                data: {
                    textarea
                }
            })
        }

        if (error) {
            console.log(error)
        }

        if (data && called && state.length > 0) {
            setState('')
            const res = data.addWeeshCommentForUser
            weeshPageDispatch({
                type: 'ADD_COMMENT',
                data: res
            })
        }
        
    }, [data])

    return auth.id != undefined && <StyledContainer hasComment={props.comment && props.comment.weeshComments.length > 0}>
        <Avatar user={auth}/>
        <StyledFormContainer>
            {weeshPage.reply && <StyledReplyContainer>
                <StyledReplyLabel>
                    Reply to <StyledReplyUsername>@{weeshPage.reply.username}</StyledReplyUsername>
                </StyledReplyLabel> 
                <StyledReplyDiscardIcon onClick={handleDiscardReply}>
                    <Icon icon='X' size='18' color='gray' />
                </StyledReplyDiscardIcon>
            </StyledReplyContainer>}
            <StyledForm onSubmit={e => e.preventDefault()}>
                <StyledTextArea maxRows={5} ref={textarea} value={state} autoCorrect='off' autoComplete='off' onChange={e => handleChange(e)} />
                <StyledButton disabled={state.length < 1} onClick={handleAddWeeshComment}>Send</StyledButton>
            </StyledForm>
        </StyledFormContainer>
    </StyledContainer>
}