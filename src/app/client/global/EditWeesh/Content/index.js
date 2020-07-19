import React from 'react'
import styled, { css } from 'styled-components'
import { WeeshContext } from 'Root/contexts/weesh'
import { AuthContext } from 'Root/contexts/auth'
import SuggestionTag from 'Root/components/global/SuggestionTag'
import Main from 'Root/app/client/global/EditWeesh/Main'
import Footer from './Footer'
import SliderTab from 'Root/components/global/SliderTab'
import Loading from 'Root/components/global/Loading'
import uuid from 'uuid'
import C from 'Root/constants'
import Meta from 'Root/meta'
import helpers from 'Root/helpers'
import { useQuery } from '@apollo/react-hooks'
import api from 'Root/api'
import { ReactTitle } from 'react-meta-tags'

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
    const { match } = props
    const { weesh, dispatch } = React.useContext(WeeshContext)
    const { auth } = React.useContext(AuthContext)
    const { data, called, error, loading } = useQuery(
        api.weeshes.getWeeshByLink,
        {
            variables: {
                link: `${match.params.link}`,
            },
            fetchPolicy: 'no-cache',
        },
    )

    React.useEffect(() => {
        if (data) {
            dispatch({
                type: 'ADD_WEESH',
                data: {
                    content: data.getWeeshByLinkForUser.content,
                    id: data.getWeeshByLinkForUser.id,
                },
            })
        }
    }, [data])

    return auth.id && weesh.id ? (
        <StyledContainer>
            <Meta type='EditWeesh' />
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
