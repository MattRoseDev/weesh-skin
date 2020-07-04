import React from 'react'
import Modal from './Modal'
import styled from 'styled-components'
import C from 'Root/constants'

const StyledContainer = styled.div`
    background: rgba(0,0,0,0.9);
    /* background: ${({ theme }) => theme.colors.background}; */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    ${C.styles.flex.flexColumnCenter};
`

export default props => {
    return (
        <>
            {props.visible && (
                <StyledContainer>
                    <Modal {...props} />
                </StyledContainer>
            )}
        </>
    )
}
