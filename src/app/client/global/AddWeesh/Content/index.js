import React from 'react'
import styled, { css } from 'styled-components'
import { WeeshContext } from 'Root/contexts/weesh'
import { AuthContext } from 'Root/contexts/auth'
import StyledComponents, { Components } from 'Root/StyledComponents'
import Main from 'Root/app/client/global/AddWeesh/Main'
import Footer from './Footer'
import Loading from 'Root/components/global/Loading'
import uuid from 'uuid'
import C from 'Root/constants'
import Meta from 'Root/meta'
import helpers from 'Root/helpers'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumn};
    background: ${({ theme }) => theme.colors.background};
    min-height: ${window.innerHeight - 55}px;
`

const StyledFrame = styled.div`
    ${C.styles.flex.flexColumn};
    padding: 0.75rem 0.75rem 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
    overflow: hidden;
`

export default props => {
    const { auth } = React.useContext(AuthContext)

    return auth.id ? (
        <StyledContainer>
            <Meta type='AddWeesh' />
            <Components.Global.SuggestionAddWeesh />
            <StyledComponents.AddWeesh.Frame>
                <StyledComponents.Weesh.Header.LeftSide>
                    <Components.Global.Avatar
                        to={`/${auth.username}`}
                        user={auth}
                    />
                    {auth.username && (
                        <StyledComponents.Weesh.Header.NameContainer>
                            <Components.Global.FullName
                                user={auth}
                                fontSize={0.85}
                            />
                            <StyledComponents.Weesh.Header.Username>
                                @{auth.username}
                            </StyledComponents.Weesh.Header.Username>
                        </StyledComponents.Weesh.Header.NameContainer>
                    )}
                </StyledComponents.Weesh.Header.LeftSide>
                <Main type='ADD' {...props} />
                <Footer type='ADD' />
            </StyledComponents.AddWeesh.Frame>
        </StyledContainer>
    ) : (
        <Loading padding='3rem 0 0' size={28} strokeWidth={1.25} color='gray' />
    )
}
