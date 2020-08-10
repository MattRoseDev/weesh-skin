import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import { SnackBarContext } from 'Root/contexts/snackbar'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.alignItemsCenter};
    margin: 0 1rem 1rem;
`

const StyledCodeTitle = styled.label`
    /* font-weight: bold; */
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.gray};
`

const StyledCode = styled.span`
    /* font-weight: bold; */
    margin: 0.5rem 0 0;
    font-size: 2.5rem;
    letter-spacing: 0.25rem;
    color: ${({ theme }) => theme.colors.foreground};
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

    return (
        <StyledContainer>
            <StyledTextArea
                disabled
                ref={textarea}
                defaultValue={`${window.location.origin}/?invitationCode=${props.invitationCode}`}
                inputMode='none'
            />
            <StyledCodeTitle>{C.txts.en.credit.invitationCode}</StyledCodeTitle>
            <StyledCode onClick={handleCopyLink}>
                {props.invitationCode}
            </StyledCode>
        </StyledContainer>
    )
}
