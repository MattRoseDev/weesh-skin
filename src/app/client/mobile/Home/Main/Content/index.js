import React from 'react'
import styled from 'styled-components'
import uuid from 'uuid'
import Weesh from 'Root/components/global/Weesh'
import BannerMessage from 'Root/components/global/BannerMessage'
import Loading from 'Root/components/global/Loading'
import Loader from 'Root/components/global/Loader'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from 'Root/contexts/auth'
import api from 'Root/api'
import C from 'Root/constants'
import authError from 'Root/errors/auth'

const StyledContainer = styled.div`
    /* ${C.styles.flex.flexColumn}; */
    /* ${C.styles.flex.justifyContentStart}; */
`

const StyledLoadingContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentStart};
    padding: .5rem;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
`

const StyledMain = styled.div`
    /* ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentStart}; */
    background: ${({theme}) => theme.colors.background};
    padding: .5rem .5rem 3.125rem;
`

const StyledLoader = styled.div`
    ${C.styles.flex.flexRowCenter};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    padding: 2rem 0;
`

export default () => {
    const { auth, dispatch } = React.useContext(AuthContext)
    const [state, setState] = React.useState(null)
    const { data, called, error, loading } = useQuery(api.weeshes.getHomeWeeshes, {
        variables: {
            limit: 100
        },
        fetchPolicy: 'no-cache',
    })

    React.useEffect(() => {
        if (error) {
            authError({ error }) && dispatch({ type: 'LOGOUT' })
            console.log(error)
        }

        if (called && data) {
            const result = data.getHomeWeeshesForUser
            setState(result)
        }
    }, [data, error])

    return <StyledContainer>
        {loading ? <Loading padding='2rem 0 0' size={28} strokeWidth={1.25} color='gray' /> : state && state.weeshes.length > 0 && <StyledMain> 
            {state.weeshes.map(weesh => <Weesh {...weesh} key={uuid()} />)}
            {/* <StyledLoader>
                <Loader size={20} strokeWidth={1.25} color='gray' />      
            </StyledLoader> */}
        </StyledMain> }
        {!loading && state && !state.weeshes.length && <StyledLoadingContainer>
            <BannerMessage padding='0 1rem' icon='Users' title={C.txts.en.g.welcome} message={C.txts.en.g.noFollowingYet} />
        </StyledLoadingContainer>}
    </StyledContainer>
}