import React from 'react'
import styled from 'styled-components'
import Auth from 'Root/components/mobile/Auth'
import Header from 'Root/components/global/Weesh/Header'
import Main from 'Root/components/global/Weesh/Main'
import Footer from 'Root/components/global/Weesh/Footer'
import C from 'Root/constants'

const StyledWeesh = styled.div`
    position: relative;
    overflow: hidden;
    ${C.styles.flex.flexColumn};
    width: 100%;
    ${C.styles.boxShadow.primary.normal};
    /* border-bottom: 1px solid ${({ theme }) => theme.colors.light}; */
    border-radius: .75rem;
    margin: 0 0 .5rem;
`

const StyledGlass = styled.div`
    ${C.styles.flex.flexRowCenter};
    position: absolute;
    background: ${({ theme }) => theme.colors.background};
    backdrop-filter: blur(5px);
    border-radius: 0.75rem;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`

export default props => {
    const { lastItem } = props
    return (
        <StyledWeesh>
            {lastItem && (
                <StyledGlass>
                    <Auth />
                </StyledGlass>
            )}
            <Header {...props} />
            <Main {...props} />
            <Footer {...props} />
        </StyledWeesh>
    )
}
