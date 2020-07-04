import React from 'react'
import Container from 'Root/components/desktop/Container'
import C from 'Root/constants'
import styled from 'styled-components'
import {AuthContext} from 'Root/contexts/auth'
import Explore from './Explore'
import Cards from './Cards'

const StyledContainer = styled.div`
    background: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.foreground};
    position: sticky;
    top: 0;
    bottom: 0;
    margin: 0 0 0 0.5rem;
    height: ${window.innerHeight}px;
    overflow-y: scroll;
`

export default props => {
    const {auth} = React.useContext(AuthContext)

    return (
        <StyledContainer>
            {auth.id &&
                (props.explore == undefined || props.explore == true) && (
                    <Explore {...props} />
                )}
            <Cards {...props} />
        </StyledContainer>
    )
}
