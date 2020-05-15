import React from 'react'
import styled from 'styled-components'
import uuid from 'uuid'
import Weesh from 'Root/components/global/Weesh'
import helpers from 'Root/helpers'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from 'Root/contexts/auth'
import { UserContext } from 'Root/contexts/user'
import api from 'Root/api'
import Loader from 'Root/components/global/Loader'
import C from 'Root/constants'

const StyledMain = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentCenter};
    padding: .5rem;
`
const StyledLoader = styled.div`
    ${C.styles.flex.flexRowCenter};
    padding: 2rem 0;
    margin: 0 0 50px;
`

export default (props) => {
    const { user } = React.useContext(UserContext)
    return <StyledMain>
        {user.weesh && user.weesh.weeshes.map(weesh => <Weesh {...weesh} key={uuid()} />)}
        <StyledLoader>
            <Loader size={20} strokeWidth={1.25} color='gray' />
        </StyledLoader>
    </StyledMain>
}