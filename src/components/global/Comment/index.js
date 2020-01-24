import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Main from './Main'
import CONSTANTS from 'Root/constants'


const StyledComment = styled.div`
    border: none;
    border-top: 1px dashed ${CONSTANTS.themes.light.colors.lightGray};
`

const Element = (props) => {
    return <StyledComment>
        <Header {...props}/>
        <Main {...props}/>
    </StyledComment>
}

export default Element