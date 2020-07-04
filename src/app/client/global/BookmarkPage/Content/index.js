import React from 'react'
import Header from './Header'
import UserNotFound from 'Root/components/global/NotFound/User'
import Loading from 'Root/components/global/Loading'
import Container from 'Root/components/desktop/Container'
import Main from './Main'
import C from 'Root/constants'
import BannerMessage from 'Root/components/global/BannerMessage'
import {useQuery, useLazyQuery} from '@apollo/react-hooks'
import {AuthContext} from 'Root/contexts/auth'
import {BookmarkContext} from 'Root/contexts/bookmark'
import useHistory from 'Root/hooks/useHistory'
import api from 'Root/api'
import styled from 'styled-components'
import authError from 'Root/errors/auth'
import Meta from 'Root/meta'
import helpers from 'Root/helpers'

const StyledContainer = styled.div`
    background: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.foreground};
    min-height: ${window.innerHeight - 55}px;
`

const StyledLoadingContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentStart};
    padding: 3rem;
    background: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.foreground};
    min-height: ${window.innerHeight - 55}px;
`

export default props => {
    const {match} = props
    const {auth, dispatch} = React.useContext(AuthContext)
    const {bookmark, dispatch: bookmarkDispatch} = React.useContext(
        BookmarkContext,
    )
    const history = useHistory()

    if (auth.username != undefined) {
        auth.username != match.params.username && history.push('/')
    }

    const {data, called, error, loading} = useQuery(
        api.weeshBookmarks.getUserBookmarksWeeshes,
        {
            fetchPolicy: 'no-cache',
        },
    )

    React.useEffect(() => {
        if (error) {
            authError({error}) && dispatch({type: 'LOGOUT'})
            console.log(error)
        }

        if (called && data) {
            const result = data.getUserBookmarksWeeshesForUser
            bookmarkDispatch({
                type: 'ADD_BOOKMARK_DATA',
                data: result,
            })
        }
    }, [data, error])

    return auth.username ? (
        <StyledContainer>
            <Meta type='Bookmarks' />
            {loading ? (
                <StyledLoadingContainer>
                    <Loading size={28} strokeWidth={1.25} color='gray' />
                </StyledLoadingContainer>
            ) : (
                called &&
                bookmark && (
                    <>
                        {/* <Header {...props} /> */}
                        <Main {...props} />
                    </>
                )
            )}
            {!loading && bookmark && !bookmark.weeshesBookmark && (
                <BannerMessage
                    padding='3rem 0'
                    icon='Hash'
                    title={C.txts.en.g.noWeeshesYet}
                />
            )}
        </StyledContainer>
    ) : (
        ''
    )
}
