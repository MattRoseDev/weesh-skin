import React from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/react-hooks"
import api from "Root/api"
import C from "Root/constants"
import Loading from "Root/components/global/Loading"
import uuid from "uuid"
import WeeshForShowcase from "Root/components/global/WeeshForShowcase"

const StyledWeeshes = styled.div`
    ${C.styles.flex.flexColumn};
    width: 38rem;
`

export default () => {
    const [state, setState] = React.useState(null)
    const { data, called, error, loading } = useQuery(api.weeshes.getShowcase, {
        variables: {
            type: "SHOWCASE",
            limit: 2,
        },
    })
    React.useEffect(() => {
        if (error) {
            console.log(error)
        }

        if (called && data) {
            const result = data.getTheBestWeeshesForUser
            setState(result)
        }
    }, [data, error])
    return (
        <StyledWeeshes>
            {loading ? (
                <Loading size={28} strokeWidth={1.25} color="gray" />
            ) : (
                state &&
                state.weeshes &&
                state.weeshes.map(weesh => (
                    <WeeshForShowcase {...weesh} key={uuid()} />
                ))
            )}
        </StyledWeeshes>
    )
}
