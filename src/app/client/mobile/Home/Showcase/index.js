import React from "react"
import styled from "styled-components"
import helpers from "Root/helpers"
import C from "Root/constants"
import Meta from "Root/meta"
import Header from "./Header"
import Footer from "./Footer"
import Section from "./Section"
import Banner from "./Banner"
import RecentWeeshes from "./RecentWeeshes"
import RecentTags from "./RecentTags"
import DreamingWillHelpYou from "./DreamingWillHelpYou"
import { AuthContext } from "Root/contexts/auth"
import WhyWeesh from "./WhyWeesh"

const StyledContainer = styled.div`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    ${C.styles.flex.flexColumnCenter};
`

const StyledMergeComponent = styled.div`
    ${C.styles.flex.flexColumn};
    padding: 0 0.5rem;
`

export default props => {
    const { auth, dispatch } = React.useContext(AuthContext)

    helpers.saveQueryString({
        location: props.location,
        param: "invitationCode",
    })

    return (
        <StyledContainer>
            <Meta type="Showcase" />
            <Header auth={auth} dispatch={dispatch} />
            <Banner />
            <StyledMergeComponent>
                <Section title="Recent Weeshes">
                    <RecentWeeshes />
                </Section>
                <Section title="Trending at Weesh">
                    <RecentTags />
                </Section>
            </StyledMergeComponent>
            <Section title="Dreaming will Help you">
                <DreamingWillHelpYou auth={auth} />
            </Section>
            <Section title="Why Weesh?">
                <WhyWeesh auth={auth} />
            </Section>
            <Footer />
        </StyledContainer>
    )
}
