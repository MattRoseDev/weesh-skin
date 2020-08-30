import React from 'react'
import styled from 'styled-components'
import Friend from 'Root/public/img/credit/friend.svg'
import Challenge from 'Root/public/img/credit/challenge.svg'
import Bug from 'Root/public/img/credit/bug.svg'
import Idea from 'Root/public/img/credit/idea.svg'
import Buy from 'Root/public/img/credit/buy.svg'
import Grand from 'Root/public/img/credit/grand.svg'
import Item from './Item'
import C from 'Root/constants'
import useHistory from 'Root/hooks/useHistory'
import { SnackBarContext } from 'Root/contexts/snackbar'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    flex-wrap: wrap;
`

const StyledTextArea = styled.textarea`
    height: 0;
    width: 0;
    resize: none;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.background};
`

export default props => {
    const { dispatch: snackbarDispatch } = React.useContext(SnackBarContext)
    const textarea = React.useRef()

    const handleCopyLink = () => {
        textarea.current.disabled = false
        textarea.current.select()
        document.execCommand('copy')
        textarea.current.disabled = true
        window.getSelection().removeAllRanges()
        snackbarDispatch({
            type: 'SET_DATA',
            data: {
                icon: 'Copy',
                message: 'Invitation Link copied to clipboard.',
                background: 'foreground',
                visible: true,
            },
        })
        setTimeout(() => {
            snackbarDispatch({ type: 'HIDE' })
        }, 2 * 1000)
    }

    const history = useHistory()

    const items = [
        {
            title: 'Invite a Friend',
            description:
                'Tell your friends about weesh. Inviter and the invited account will gain credit.',
            icon: Friend,
            width: 75,
            height: 75,
            value: 1,
            color: C.themes[`${props.auth.theme}`].colors.foreground,
            handleClick: () => {
                return handleCopyLink()
            },
        },
        {
            title: 'Win a Challenge',
            description:
                'Weesh with challenges tags and become the most popular.',
            icon: Challenge,
            width: 75,
            height: 75,
            value: 3,
            color: C.themes[`${props.auth.theme}`].colors.foreground,
            handleClick: () => {
                return history.push('/compose/weesh')
            },
        },
        {
            title: 'Find a Bug',
            description: "If some thing isn't working, tell us in support.",
            icon: Bug,
            width: 75,
            height: 75,
            value: 1,
            color: C.themes[`${props.auth.theme}`].colors.foreground,
            handleClick: () => {
                return history.push('/support')
            },
        },
        {
            title: 'A Creative Suggestion',
            description: 'Have an idea about weesh.me? Tell us in support.',
            icon: Idea,
            width: 75,
            height: 75,
            value: 1,
            color: C.themes[`${props.auth.theme}`].colors.foreground,
            handleClick: () => {
                return history.push('/support')
            },
        },
        {
            title: 'Win Grand Challenge (locked)',
            description:
                'Win the grand challenge and have the chance to buy a weesh box.',
            icon: Grand,
            width: 75,
            height: 75,
            color: C.themes[`${props.auth.theme}`].colors.gray,
            disable: true,
        },
        {
            title: 'Buy Credit (locked)',
            description: 'Exchange your local money to weesh credit.',
            icon: Buy,
            width: 75,
            height: 75,
            color: C.themes[`${props.auth.theme}`].colors.gray,
            disable: true,
        },
    ]
    return (
        <>
            <StyledContainer>
                {items.map(item => (
                    <Item auth={props.auth} {...item} />
                ))}
            </StyledContainer>
            <StyledTextArea
                disabled
                ref={textarea}
                defaultValue={`${window.location.origin}/?invitationCode=${props.invitationCode}`}
                inputMode='none'
            />
        </>
    )
}
