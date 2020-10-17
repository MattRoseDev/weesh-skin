import React from 'react'
import styled from 'styled-components'
import Catalog from 'Root/components/desktop/Catalog'
import helpers from 'Root/helpers'
import C from 'Root/constants'
import Meta from 'Root/meta'
import Header from './Header'
import Footer from './Footer'
import Section from './Section'
import Banner from './Banner'
import RecentWeeshes from './RecentWeeshes'
import RecentTags from './RecentTags'
import DreamingWillHelpYou from './DreamingWillHelpYou'

const StyledContainer = styled.div`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    ${C.styles.flex.flexColumnCenter};
    padding: 0 0.5rem 0.5rem;
`

export default props => {
    helpers.saveQueryString({
        location: props.location,
        param: 'invitationCode',
    })

    return (
        <StyledContainer>
            <Meta type='Showcase' />
            <Header />
            <Banner />
            <Section title='Recent Weeshes'>
                <RecentWeeshes />
            </Section>
            <Section title='Trending at Weesh'>
                <RecentTags />
            </Section>
            <Section title='Dreaming will Help you'>
                <DreamingWillHelpYou />
            </Section>
            <Footer />
        </StyledContainer>
    )
}
