import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import uuid from "uuid"
import List from "Root/components/desktop/List"
import Loading from "Root/components/global/Loading"
import C from "Root/constants"
import { useQuery } from "@apollo/react-hooks"
import useHistory from "Root/hooks/useHistory"
import api from "Root/api"
import Meta from "Root/meta"
import helpers from "Root/helpers"

const StyledContainer = styled.div`
    padding: 0.25rem 0;
    min-height: ${window.innerHeight - 55}px;
`

const StyledLoaderContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentCenter};
    padding: 1rem;
`

export default props => {
    let url = props.match.url.split("/")
    const [state, setState] = React.useState(null)
    const history = useHistory()
    const [status, setStatus] = React.useState(url[url.length - 1])
    const { data, called, error, loading } = useQuery(api.weeshLikes.getLikes, {
        variables: {
            link: `${props.match.params.link}`,
        },
        fetchPolicy: "no-cache",
    })

    React.useEffect(() => {
        if (error) {
            return history.push(`/`)
        }
    }, [error])

    React.useEffect(() => {
        if (called && data) {
            const result = data.getWeeshLikesByLinkForUser.weeshLikes
            setState(result)
        }
    }, [data])

    return (
        <StyledContainer>
            <Meta />
            {loading ? (
                <Loading
                    padding="3rem 0 0"
                    size={28}
                    strokeWidth={1.25}
                    color="gray"
                />
            ) : (
                state && <List index="user" users={state} />
            )}
        </StyledContainer>
    )
}
