import React from 'react'
import styled from 'styled-components'
import CONSTANTS from 'Root/constants'
import Button from './Button'

const Auth = styled.div`
    display: inline-flex;
    align-items: center;
    margin: .5em 0 0;
    font-size: ${({ fontSize }) => fontSize || 1.5}rem;
`

const Element = (props) => {
    return <Auth {...props} >
        <Button fill={'true'} to='/login'>{CONSTANTS.txts.en.auth.loginButton}</Button>
        <Button to='/join'>{CONSTANTS.txts.en.auth.joinButton}</Button>
    </Auth>
}
export default Element