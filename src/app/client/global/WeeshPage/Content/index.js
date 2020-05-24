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
import { Helmet } from 'react-helmet'
import helpers from 'Root/helpers'

const StyledContainer = styled.div`
    /* padding: .5rem; */
    min-height: ${window.innerHeight - 55}px;
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

export default (props) => {
    const { match } = props
    const { auth } = React.useContext(AuthContext)
    const { weeshPage, dispatch: weeshPageDispatch } = React.useContext(WeeshPageContext)
    const history = useHistory()

    const [state, setState] = React.useState(null)
    const { data, called, error, loading } = useQuery(api.weeshes.getWeeshByLink, {
        variables: {
            link: `${match.params.link}`
        },
        fetchPolicy: 'no-cache',
    })

    React.useEffect(() => {
        if(error) {
            console.log(error)
        }

        if (called && data) {
            const response = data.getWeeshByLinkForUser
            
            if(!auth.token && response.status < 3) {
                history.push('/login')
            }
            weeshPageDispatch({
                type: 'SET_WEESH',
                data: response
            })
            setState(response)
        }
    }, [data, error])

    return <StyledContainer>
        {weeshPage.user && <Helmet>
            <title>{helpers.titleTag({ 
                type: 'WeeshPage',
                data: {
                    weesh: weeshPage
                }
            })}</title>
        </Helmet>}
        {loading ? <StyledLoadingContainer>
            <Loading size={28} strokeWidth={1.25} color='gray' />
        </StyledLoadingContainer> : called && state && <StyledWeesh>
                <Header {...state} />
                <Main {...state} />
                <Footer {...state} />
                {auth.id != undefined && <AddComment {...state} />}
                <Comments {...state} />
            </StyledWeesh> 
        }
        {!loading && error && !state && <BannerMessage padding='3rem 0 0' icon='Frown' 
        title={C.txts.en.g.weeshNotFound} />}
    </StyledContainer>
}