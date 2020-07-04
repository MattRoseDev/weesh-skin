import React from 'react'
import C from 'Root/constants'
import Icon from 'Root/components/global/Icon'
import {AuthContext} from 'Root/contexts/auth'
import useHistory from 'Root/hooks/useHistory'
import styled from 'styled-components'

const StyledContainer = styled.button`
    border: none;
    background: ${({theme}) => theme.colors.background};
    color: ${({theme, color}) => theme.colors[color || 'foreground']};
    cursor: pointer;
    padding: 0;
`

export default props => {
    const {auth, dispatch} = React.useContext(AuthContext)
    const history = useHistory()
    const handleBack = () => history.goBack()

    return (
        <StyledContainer>
            <Icon
                onClick={handleBack}
                size={props.size || 24}
                color="foreground"
                fill={
                    C.themes[auth.theme || 'light'].colors[props.fill] || 'none'
                }
                icon={props.icon || 'ChevronLeft'}
            />
        </StyledContainer>
    )
}
