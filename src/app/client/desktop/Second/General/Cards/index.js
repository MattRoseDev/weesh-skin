import React from 'react'
import styled, { css } from 'styled-components'
import ListsCard from 'Root/components/desktop/ListsCard'
import C from 'Root/constants'
import { useQuery } from '@apollo/react-hooks'
import api from 'Root/api'
import uuid from 'uuid'
import Link from 'Root/components/global/Link'

const StyledContainer = styled.div`
    padding: 1rem 0.5rem 0.5rem;
    ${C.styles.scrollbar.hide};
`

const StyledItem = styled(Link)`
    padding: 0.5rem;
    ${C.styles.flex.flexColumn};
`

const StyledItemTitle = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
`
const StyledWeeshCounter = styled.div`
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.gray};
    margin: 0.25rem 0 0;
`

export default props => {
    const [state, setState] = React.useState(null)

    const { error, data, loading, called } = useQuery(api.tags.getTheBestTags, {
        variables: {
            limit: 5,
        },
    })

    React.useEffect(() => {
        if (error) {
            console.log(error)
        }
        if (data) {
            if (!state) {
                let items = []
                for (let tag of data.getTheBestTagsForUser.tags) {
                    items.push(<Item {...tag} />)
                }
                setState(items)
            }
        }
    }, [data])

    return (
        <StyledContainer {...props}>
            <ListsCard title='TRENDING' items={state} />
        </StyledContainer>
    )
}

const Item = props => {
    return (
        <StyledItem to={`/t/${props.title}`}>
            {props.title && <StyledItemTitle>#{props.title}</StyledItemTitle>}
            {props.weeshCounter && (
                <StyledWeeshCounter>
                    {props.weeshCounter} weeshes
                </StyledWeeshCounter>
            )}
        </StyledItem>
    )
}
