import React from 'react'
import Header from './Header'
import UserNotFound from 'Root/components/global/NotFound/User'
import Loading from 'Root/components/global/Loading'
import Container from 'Root/components/desktop/Container'
import Main from 'Root/app/client/global/UserProfile/Content/Main'
import C from 'Root/constants'
import BannerMessage from 'Root/components/global/BannerMessage'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { AuthContext } from 'Root/contexts/auth'
import { UserContext } from 'Root/contexts/user'
import useHistory from 'Root/hooks/useHistory'
import api from 'Root/api'
import styled from 'styled-components'
import authError from 'Root/errors/auth'
import helpers from 'Root/helpers'
import Meta from 'Root/meta'

const StyledContainer = styled.div`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    min-height: ${window.innerHeight - 55}px;
`

export default props => {
    const { match } = props
    const [nextPage, setNextPage] = React.useState(1)
    const { auth, dispatch } = React.useContext(AuthContext)
    const { user, dispatch: userDispatch } = React.useContext(UserContext)
    const history = useHistory()

    const { data, called, error, loading } = useQuery(
        api.users.getUserByUsernameForUser,
        {
            variables: {
                username: `${match.params.username}`,
            },
            fetchPolicy: 'no-cache',
        },
    )

    const [getWeeshes, getWeeshesResponse] = useLazyQuery(
        api.weeshes.getWeeshes,
        {
            fetchPolicy: 'no-cache',
        },
    )

    const handlePaginate = () =>
        getWeeshes({
            variables: {
                userId: `${user.id}`,
                page: nextPage,
            },
        })

    React.useEffect(() => {
        if (getWeeshesResponse.data) {
            const response = getWeeshesResponse.data.getWeeshesForUser.weeshes
            userDispatch({
                type: 'ADD_WEESHES',
                data: response,
            })
            getWeeshesResponse.data.getWeeshesForUser.paginate &&
                setNextPage(
                    getWeeshesResponse.data.getWeeshesForUser.paginate.nextPage,
                )
        }
    }, [getWeeshesResponse])

    React.useEffect(() => {
        if (error) {
            authError({ error }) && dispatch({ type: 'LOGOUT' })
        }
    }, [error])

    React.useEffect(() => {
        if (called && data) {
            const response = data.getUserByUsernameForUser
            userDispatch({
                type: 'ADD_USER_DATA',
                data: response,
            })
            data.getUserByUsernameForUser.weesh.paginate &&
                setNextPage(
                    data.getUserByUsernameForUser.weesh.paginate.nextPage,
                )
        }
    }, [data])

    return (
        <StyledContainer>
            {user && <Meta type='UserProfile' data={{ user }} />}
            {loading ? (
                <Loading
                    padding='3rem 0 0'
                    size={28}
                    strokeWidth={1.25}
                    color='gray'
                />
            ) : (
                called &&
                user && (
                    <>
                        <Header {...props} />
                        {user.private &&
                        user.connection.status < 2 &&
                        auth.id !== user.id ? (
                            <BannerMessage
                                icon='Lock'
                                padding='3rem 0 5rem'
                                title={C.txts.en.g.privateAccount}
                                height={50}
                            />
                        ) : user.weesh.weeshes.length > 0 ? (
                            <Main
                                {...props}
                                nextPage={nextPage}
                                handlePaginate={handlePaginate}
                            />
                        ) : (
                            <BannerMessage
                                icon='PenTool'
                                padding='3rem 0 5rem'
                                title={C.txts.en.g.noWeeshesYet}
                                height={50}
                            />
                        )}
                    </>
                )
            )}
            {!loading && error && !user && (
                <BannerMessage
                    padding='3rem 0 5rem'
                    icon='User'
                    title={C.txts.en.g.userNotFound}
                />
            )}
        </StyledContainer>
    )
}
