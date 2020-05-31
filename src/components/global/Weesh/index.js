import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import C from 'Root/constants'

const StyledWeesh = styled.div`
    ${C.styles.flex.flexColumn};
    width: 100%;
    ${C.styles.boxShadow.primary.normal};
    /* border: 1px solid ${({theme}) => theme.colors.light}; */
    border-radius: .75rem;
    margin: 0 0 .5rem;
`

export default (props) => {
    return <StyledWeesh>
        <Header {...props} />
        <Main {...props} />
        <Footer {...props} />
    </StyledWeesh>
}