import React from 'react'
import styled, { css } from 'styled-components'
import { WeeshContext } from 'Root/contexts/weesh'
import { AuthContext } from 'Root/contexts/auth'
import SuggestionTag from 'Root/components/global/SuggestionTag'
import Main from 'Root/app/client/global/EditWeesh/Main'
import Footer from './Footer'
import Loading from 'Root/components/global/Loading'
import uuid from 'uuid'
import C from 'Root/constants'
import Meta from 'Root/meta'
import helpers from 'Root/helpers'
import useHistory from 'Root/hooks/useHistory'
import { useQuery } from '@apollo/react-hooks'
import api from 'Root/api'

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
    const history = useHistory()
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
        if (error) {
            return history.push(`/`)
        }
    }, [error])

    React.useEffect(() => {
        if (data) {
            if (auth.id && data.getWeeshByLinkForUser.user.id != auth.id) {
                return history.push(`/w/${match.params.link}`)
            }
            dispatch({
                type: 'ADD_WEESH',
                data: {
                    content: data.getWeeshByLinkForUser.content,
                    id: data.getWeeshByLinkForUser.id,
                },
            })
        }
    }, [data, auth.id])

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
