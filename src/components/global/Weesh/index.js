import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import CONSTANTS from 'Root/constants'

const StyledWeesh = styled.div`
    display: flex;
    flex-direction: column;
    ${CONSTANTS.styles.boxShadow.primary.normal}
    /* border-bottom: 1px solid ${CONSTANTS.themes.light.colors.light}; */
    border-radius: .5rem;
    margin: 0 0 .5rem;
`

const Element = (props) => {
    return <StyledWeesh>
        <Header {...props} />
        <Main {...props} />
        <Footer {...props} />
    </StyledWeesh>
}

export default Element