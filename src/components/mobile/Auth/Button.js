import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import CONSTANTS from 'Root/constants'

const Button = styled(Link)`
    text-decoration: none;
    font-size: 1rem;
    padding: .5rem 2rem;
    border-radius: .5rem;
    ${({ fill }) => fill ? css`
        background: ${CONSTANTS.themes.light.colors.white};
        color: ${CONSTANTS.themes.light.colors.dark};
    ` : css`
        color: ${ CONSTANTS.themes.light.colors.white};
        background: ${ CONSTANTS.themes.light.colors.dark};
    `};
    
`

const Element = (props) => {
    return <Button {...props}>{props.children}</Button>
}

export default Element