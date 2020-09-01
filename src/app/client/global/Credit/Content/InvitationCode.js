import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import { SnackBarContext } from 'Root/contexts/snackbar'
import StyledComponents, { Components } from 'Root/StyledComponents'

const StyledContainer = styled.div`
    display: block;
    width: 100%;
    text-align: center;
    border-top: 1px solid ${({ theme }) => theme.colors.light};
    border-right: 1px solid ${({ theme }) => theme.colors.light};
    font-size: 1.25rem;
    padding: 0.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.foreground};
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
        <StyledContainer onClick={handleCopyLink}>
            {C.txts.en.credit.invitationCode}
            <StyledComponents.Textarea.Clipboard
                disabled
                ref={textarea}
                defaultValue={`${window.location.origin}/?invitationCode=${props.invitationCode}`}
                inputMode='none'
            />
        </StyledContainer>
    )
}
