import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import api from 'Root/api'
import Weesh from 'Root/components/global/Weesh'
import Loading from 'Root/components/global/Loading'
import styled from 'styled-components'
import C from 'Root/constants'
import uuid from 'uuid'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentCenter};
    padding: 0.5rem 0 0;
`

export default () => {
    const [state, setState] = React.useState(null)
    const {data, called, error, loading} = useQuery(api.weeshes.getShowcase, {
        variables: {
            limit: 100,
        },
    })

    React.useEffect(() => {
        if (called && data) {
            const response = data.getTheBestWeeshesForUser
            setState(response)
        }
    }, [data])
    return (
        <StyledContainer>
            {loading ? (
                <Loading
                    padding="3rem 0 0"
                    size={28}
                    strokeWidth={1.25}
                    color="gray"
                />
            ) : (
                state &&
                state.weeshes &&
                state.weeshes.map((weesh, key) => (
                    <Weesh {...weesh} key={uuid()} />
                ))
            )}
        </StyledContainer>
    )
}
