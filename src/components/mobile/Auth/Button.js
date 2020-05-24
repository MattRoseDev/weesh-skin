import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import C from 'Root/constants'

const Button = styled(Link)`
    text-decoration: none;
    font-weight: 900;
    font-size: 1rem;
    padding: .65rem 2rem;
    border-radius: .75rem;
    ${({ fill }) => fill ? css`
        background: unset;
        color: ${({ theme }) => theme.colors.blue};
    ` : css`
        color: ${({ theme }) => theme.colors.background};
        background: ${({ theme }) => theme.colors.blue};
    `};
`

export default (props) => {
    return <Button {...props}>{props.children}</Button>
}