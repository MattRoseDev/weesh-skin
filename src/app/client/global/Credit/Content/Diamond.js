import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import diamond from 'Root/public/icons/diamond.svg'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.center};
`

const StyledNumber = styled.span`
    font-size: 4rem;
    margin: 0 0.5rem 0 0;
    padding: 1.125rem 0 0 0;
    background: linear-gradient(to right top, #0ba7dd, #68e9ff);
    -webkit-background-clip: text !important;
    background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-size: 100% 100%;
    font-family: Autumn_in_November;
    font-weight: bolder;
    overflow: hidden;
`

export default () => {
    return (
        <StyledContainer>
            <StyledNumber>{63}</StyledNumber>
            <img src={diamond} width='60' />
        </StyledContainer>
    )
}
