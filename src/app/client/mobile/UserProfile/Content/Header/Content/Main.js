import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import { UserContext } from 'Root/contexts/user'
import { AuthContext } from 'Root/contexts/auth'
import FullName from 'Root/components/global/FullName'
import Icon from 'Root/components/global/Icon'
import CounterForProfile from 'Root/components/global/CounterForProfile'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.alignItemsStart};
    ${C.styles.flex.alignSelfStart};
    padding: 0 1rem;
`

const StyledButtonContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
    ${C.styles.flex.alignItemsStretch};
    padding: .5rem 0 0;
`

const StyledUsername = styled.span`
    margin: 0;
    font-size: .85rem;
    font-weight: normal;
    color: ${({theme}) => theme.colors.dark};
`

const StyledBio = styled.pre`
    margin: .5rem 0 0;
    font-size: .85rem;
    font-weight: normal;
    color: ${({theme}) => theme.colors.foreground};
`

const initVariables = {
    followers: 0,
    following: 0,
    weeshes: 0,
}


export default (props) => {
    const [numbers, setNumbers] = React.useState(initVariables)
    const { user } = React.useContext(UserContext)
    const { auth } = React.useContext(AuthContext)

    React.useEffect(() => {
        user && setNumbers({
            followers: user.followers.paginate.totalDocs,
            following: user.following.paginate.totalDocs,
            weeshes: user.weesh.paginate ? user.weesh.paginate.totalDocs : 0,
        })
    }, [user])

    return  <StyledContainer>
        <FullName user={user} fontSize={1.25}/>
        <StyledUsername>
            {user.username && `@${user.username}`}
        </StyledUsername>
        {user.bio && <StyledBio>
            {user.bio}
        </StyledBio>}
        <StyledButtonContainer>
            <CounterForProfile
                title='Followers'
                to={(auth.username == user.username || !user.private || user.connection.status == 2) && numbers.followers > 0 ? `/${user.username}/followers` : undefined}
                number={numbers.followers} />
            <CounterForProfile
                title='Following'
                to={(auth.username == user.username || !user.private || user.connection.status == 2) && numbers.following > 0 ? `/${user.username}/following` : undefined}
                number={numbers.following} />
            <CounterForProfile
                title='Weeshes'
                number={numbers.weeshes} />
        </StyledButtonContainer>
    </StyledContainer>
}
