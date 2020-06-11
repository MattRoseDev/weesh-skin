import React from 'react'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import { useQuery } from '@apollo/react-hooks'
import api from 'Root/api'
import uuid from 'uuid'
import Link from 'Root/components/global/Link'

const StyledContainer = styled.div`
    padding: .75rem 0 0;
    ${C.styles.scrollbar.hide};
`

const StyledTagsContainer = styled.div`
    ${C.styles.flex.flexRow};
    overflow-x: scroll;
    ${C.styles.scrollbar.hide};
`

const StyledHeaderTitle = styled.span`
    padding: .5rem;
    color: ${({ theme }) => theme.colors.gray};
`

const StyledItem = styled(Link)`
    padding: .5rem;
    ${C.styles.flex.flexColumn};
    font-size: ${({fontSize}) => fontSize || '1rem'};
`

const StyledItemTitle = styled.div`
    color: ${({theme}) => theme.colors.primary};
    font-weight: bold;
`

const StyledWeeshCounter = styled.div`
    font-size: ${({ fontSize }) => fontSize || '.75rem'};
    color: ${({ theme }) => theme.colors.gray};
    margin: .25rem 0 0;
    white-space: nowrap;
`

export default (props) => {
    const [state, setState] = React.useState(null)

    const { error, data, loading, called } = useQuery(api.tags.getTheBestTags,{
        variables: {
            limit: 5
        }
    })
    
    React.useEffect(() => {
        if(error) {
            console.log(error)
        }
        if(data) {
            if (!state) {
                let response = data.getTheBestTagsForUser.tags
                setState(response)
            }
        }
    },[data])

    return <StyledContainer {...props}>
        <StyledHeaderTitle>
            TRENDING
        </StyledHeaderTitle>
        {state && <Item data={state[0]} fontSize='2rem' />}
        <StyledTagsContainer>
            {state && state.map((tag, key) => key > 0 ? <Item data={tag} key={uuid()}/> : '')}
        </StyledTagsContainer>
    </StyledContainer>
}

const Item = (props) => {
    return <StyledItem {...props} to={`/t/${props.data.title}`}>
        {props.data.title && <StyledItemTitle>#{props.data.title}</StyledItemTitle>}
        {props.data.weeshCounter && <StyledWeeshCounter fontSize={props.data.fontSize ? '1rem' : '.75rem'}>{props.data.weeshCounter} weeshes</StyledWeeshCounter>}
    </StyledItem>
}