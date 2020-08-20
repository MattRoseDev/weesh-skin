import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from 'Root/contexts/auth'
import useHistory from 'Root/hooks/useHistory'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Comments from './Comments'
import AddComment from 'Root/components/global/AddComment'
import Loading from 'Root/components/global/Loading'
import BannerMessage from 'Root/components/global/BannerMessage'
import C from 'Root/constants'
import api from 'Root/api'
import { WeeshPageContext } from 'Root/contexts/weeshPage'
import Meta from 'Root/meta'
import DrawerDialogProvider from 'Root/contexts/drawerDialog'

const StyledContainer = styled.div`
    /* padding: .5rem; */
    min-height: ${window.innerHeight - 55}px;
    margin: 0 0 3.5rem;
`

const StyledWeesh = styled.div`
    /* border-radius: .5rem; */
    position: relative;
`

const StyledLoadingContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentStart};
    padding: 3rem;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
`

export default props => {
    const { match } = props
    const { auth } = React.useContext(AuthContext)
    const { weeshPage, dispatch: weeshPageDispatch } = React.useContext(
        WeeshPageContext,
    )
    const history = useHistory()

    const [state, setState] = React.useState(null)
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
            console.log(error)
        }

        if (called && data) {
            const response = data.getWeeshByLinkForUser
            console.log(response)
            if (!auth.token && response.status < 3) {
                history.push('/login')
            }
            weeshPageDispatch({
                type: 'SET_WEESH',
                data: response,
            })
            setState(response)
            window.scrollTo(0, 0)
        }
    }, [data, error])
    return (
        <StyledContainer>
            {weeshPage.user && (
                <Meta type='WeeshPage' data={{ weesh: weeshPage }} />
            )}
            {loading ? (
                <StyledLoadingContainer>
                    <Loading size={28} strokeWidth={1.25} color='gray' />
                </StyledLoadingContainer>
            ) : (
                called &&
                state && (
                    <StyledWeesh>
                        <DrawerDialogProvider>
                            <Header {...state} />
                        </DrawerDialogProvider>
                        <Main {...state} />
                        <DrawerDialogProvider>
                            <Footer {...state} />
                        </DrawerDialogProvider>
                        {auth.id != undefined && <AddComment {...state} />}
                        <Comments {...state} />
                    </StyledWeesh>
                )
            )}
            {!loading && error && !state && (
                <BannerMessage
                    padding='3rem 0 0'
                    icon='Frown'
                    title={C.txts.en.g.weeshNotFound}
                />
            )}
        </StyledContainer>
    )
}
