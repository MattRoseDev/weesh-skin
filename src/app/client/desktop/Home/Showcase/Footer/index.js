import React from 'react'
import styled from 'styled-components'
import { Components } from 'Root/StyledComponents'
import Icon from 'Root/components/global/Icon'
import C from 'Root/constants'
import { AuthContext } from 'Root/contexts/auth'

const StyledFooter = styled.footer`
    ${C.styles.flex.flexRowCenter};
    width: 80rem;
`

const StyledAuth = styled.header`
    ${C.styles.flex.flexRow};
`

const StyledLogo = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
`

const StyledLogoDescription = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    border-left: 2px solid ${({ theme }) => theme.colors.primary};
    margin: 0 0 0 1rem;
    padding: 0.5rem 0 0.5rem 1rem;
    color: ${({ theme }) => theme.colors.primary};
`

const StyledIconContainer = styled.button`
    ${C.styles.flex.flexRowCenter};
    background: ${({ theme }) => theme.colors.background};
    border: none;
    padding: 0 0.5rem;
    border-radius: 50rem;
    height: 2rem;
    cursor: pointer;
`

export default () => {
    const { auth, dispatch } = React.useContext(AuthContext)

    const handleTheme = () => dispatch({ type: 'TOGGLE_THEME' })

    return (
        <StyledFooter>
            <Components.Global.About />
        </StyledFooter>
    )
}
