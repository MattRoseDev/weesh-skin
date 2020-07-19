import React from 'react'
import styled, { css } from 'styled-components'
import { WeeshContext } from 'Root/contexts/weesh'
import { AuthContext } from 'Root/contexts/auth'
import SuggestionTag from 'Root/components/global/SuggestionTag'
import Main from 'Root/app/client/global/AddWeesh/Main'
import Footer from './Footer'
import SliderTab from 'Root/components/global/SliderTab'
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
    width: 100%;
    ${C.styles.flex.flexColumn};
    padding: 0 0 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
    overflow: hidden;
`

export default props => {
    const { weesh } = React.useContext(WeeshContext)
    const { auth } = React.useContext(AuthContext)

    return auth.id ? (
        <StyledContainer>
            <Meta type='AddWeesh' />
            <StyledFrame>
                <SuggestionTag />
                <Main weesh={weesh} />
                <Footer />
            </StyledFrame>
        </StyledContainer>
    ) : (
        <Loading padding='3rem 0 0' size={28} strokeWidth={1.25} color='gray' />
    )
}
