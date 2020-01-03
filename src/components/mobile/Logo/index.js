import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import CONSTANTS from 'Root/constants'

const Logo = styled(Link)`
    text-decoration: none;
    color: ${CONSTANTS.themes.colors.black};
    display: inline-flex;
    font-family: Pacifico;
    margin: 0;
    font-size: ${({ fontSize }) => fontSize ? fontSize : 1.5}rem;
`

const Element = (props) => {
    return <Logo to='/' {...props} >{CONSTANTS.txts.en.general.logo}</Logo>
}

export default Element