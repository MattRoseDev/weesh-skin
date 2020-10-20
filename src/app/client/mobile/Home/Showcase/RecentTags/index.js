import React from "react"
import styled from "styled-components"
import Loading from "Root/components/global/Loading"
import C from "Root/constants"
import { useQuery } from "@apollo/react-hooks"
import api from "Root/api"
import uuid from "uuid"
import Link from "Root/components/global/Link"

const StyledTags = styled.div`
    ${C.styles.flex.flexRowCenter};
    flex-wrap: wrap;
    padding: 0 0.5rem 0.5rem;
`

const StyledItem = styled(Link)`
    padding: 0.5rem;
`

const StyledItemTitle = styled.div`
    &:hover {
        text-decoration: underline;
    }
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    font-size: 1.5rem;
`

export default props => {
    const [state, setState] = React.useState(null)

    const { error, data, loading, called } = useQuery(api.tags.getTheBestTags, {
        variables: {
            limit: 20,
        },
    })

    React.useEffect(() => {
        if (error) {
            console.log(error)
        }
        if (data) {
            if (!state) {
                setState(data.getTheBestTagsForUser.tags)
            }
        }
    }, [data])

    return (
        <StyledTags>
            {loading ? (
                <Loading size={28} strokeWidth={1.25} color="gray" />
            ) : (
                state && state.map(tag => <Item {...tag} key={uuid()} />)
            )}
        </StyledTags>
    )
}

const Item = props => {
    return (
        <StyledItem to={`/t/${props.title}`}>
            {props.title && <StyledItemTitle>#{props.title}</StyledItemTitle>}
        </StyledItem>
    )
}
