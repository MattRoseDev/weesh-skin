import React from 'react'
import styled from 'styled-components'
import Navbar from 'Root/components/desktop/Navbar'
import Logo from 'Root/components/global/Logo'
import C from 'Root/constants'

const StyledSidebar = styled.header`
    ${C.styles.flex.flexColumn};
    /* margin: 2rem 0 0; */
    width: 16rem;
    position: sticky;
    top: 0;
    bottom: 0;
    height: ${window.innerHeight}px;
`

export default () => {
    return (
        <StyledSidebar>
            <Logo fontSize={3} padding="2.5rem 0 0" />
            <Navbar />
        </StyledSidebar>
    )
}
