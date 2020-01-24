import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AuthContext } from 'Root/contexts/auth'
import CONSTANTS from 'Root/constants'

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${CONSTANTS.themes.light.colors.black};
`

const StyledMain = styled.p`
    font-size: .85rem;
    line-height: 1.125rem;
    padding: .75rem 1.25rem .5rem;
`

const Element = (props) => {
    const { auth } = React.useContext(AuthContext)
    return <StyledLink to={`${auth.username}/w/1`}>
        <StyledMain>
            {props.text}
        </StyledMain>
    </StyledLink>
}

export default Element