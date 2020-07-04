import React from 'react'
import styled from 'styled-components'
import {ExploreContext} from 'Root/contexts/explore'
import uuid from 'uuid'
import List from 'Root/components/mobile/List'
import Icon from 'Root/components/global/Icon'
import SuggestionWeeshes from 'Root/components/global/SuggestionWeeshes'
import Loading from 'Root/components/global/Loading'
import Cards from './Cards'
import helpers from 'Root/helpers'
import C from 'Root/constants'
import Meta from 'Root/meta'

const StyledMain = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentCenter};
    background: ${({theme}) => theme.colors.background};
    padding: 0 0.5rem 3.125rem;
`

const StyledLoading = styled.div`
    padding: 1rem 0;
`

const StyledNotFound = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    color: ${({theme}) => theme.colors.dark};
    padding: 0.5rem;
`

const StyledNotFoundMessage = styled.span`
    margin: 0 0 0 0.25rem;
    color: inherit;
`

const StyledBannerMessageContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentCenter};
    padding: 3rem 0 0;
`

export default () => {
    const {explore} = React.useContext(ExploreContext)

    return (
        <StyledMain>
            <Meta />
            {explore.loading && (
                <StyledLoading>
                    <Loading size={20} strokeWidth={1.25} color="gray" />
                </StyledLoading>
            )}
            {!explore.loading &&
                explore.expression.length > 0 &&
                explore.results &&
                explore.results.length > 0 && <List users={explore.results} />}
            {!explore.loading &&
                explore.expression.length > 0 &&
                explore.results &&
                explore.results.length < 1 && (
                    <StyledNotFound>
                        <Icon icon="Info" />
                        <StyledNotFoundMessage>
                            {C.txts.en.g.noResultsFound}
                        </StyledNotFoundMessage>
                    </StyledNotFound>
                )}
            {!explore.loading && explore.expression.length < 1 && (
                <>
                    <Cards />
                    <SuggestionWeeshes />
                </>
            )}
        </StyledMain>
    )
}
