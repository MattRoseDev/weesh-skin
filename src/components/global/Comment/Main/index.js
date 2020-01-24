import React from 'react'
import styled from 'styled-components'

const StyledMain = styled.p`
    padding: 0 1rem .5rem;
`

const Element = (props) => {
    return <StyledMain>{props.text}</StyledMain>
}

export default Element