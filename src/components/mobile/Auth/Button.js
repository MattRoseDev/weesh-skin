import React from 'react'
import styled, {css} from 'styled-components'
import {Link} from 'react-router-dom'
import C from 'Root/constants'

const Button = styled(Link)`
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;
    padding: 0.65rem 2rem;
    border-radius: 0.75rem;
    ${({fill}) =>
        fill
            ? css`
                  background: unset;
                  color: ${({theme}) => theme.colors.primary};
              `
            : css`
                  color: ${({theme}) => theme.colors.background};
                  background: ${({theme}) => theme.colors.primary};
              `};
`

export default props => {
    return <Button {...props}>{props.children}</Button>
}
