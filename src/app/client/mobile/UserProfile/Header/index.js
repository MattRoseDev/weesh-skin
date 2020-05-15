import React from 'react'
import styled from 'styled-components'
import Logo from 'Root/components/global/Logo'
import Header from 'Root/app/client/mobile/Template/Header'
import C from 'Root/constants'

const StyledLogo = styled.div`
    ${C.styles.flex.flexRowCenter};
    width: 100%;
`

export default () => {
    return <Header>
        <StyledLogo>
            <Logo fontSize={1.375} />
        </StyledLogo>
    </Header>
}