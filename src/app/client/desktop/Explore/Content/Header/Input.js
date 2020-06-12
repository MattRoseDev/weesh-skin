import React from 'react'
import styled from 'styled-components'
import { ExploreContext } from 'Root/contexts/explore'
import C from 'Root/constants'
import { Search } from 'react-feather'
import { useQuery } from '@apollo/react-hooks'
import api from 'Root/api'
import queryString from 'query-string'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    background: ${({theme}) => theme.colors.background};
    border-radius: .75rem;
    padding: .25rem .5rem;
    ${C.styles.boxShadow.primary.normal};
    width: 100%;
`

const StyledInput = styled.input`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    line-height: 1.5rem;
    font-size: .825rem;
    outline: none;
    border: none;
    padding: .25rem;
    width: 100%;
`


export default (props) => {
    const initVariables = {
        expression: props.location.search.length > 0 ? queryString.parse(props.location.search).q : ''
    }
    const { explore, dispatch } = React.useContext(ExploreContext)
    const [variables, setVariables] = React.useState(initVariables)

    const { error, data, called, loading, fetchMore } = useQuery(api.explore.exploreAll, {
        variables,
    })

    React.useEffect(() => {
        if(error) {
            console.log(error)
        }
        if (called && data && !loading) {

            const result = data.exploreAllForUser
            dispatch({
                type: 'EXPLORE', data: {
                    results: result ? [...result.user.users, ...result.tag.tags] : null,
                    loading,
                }
            })
        }
    }, [data])

    const handleChange = (e) => {
        dispatch({
            type: 'EXPLORE', data: {
                expression: e.target.value,
                loading,
            }
        })
        setVariables({
            expression: e.target.value,
            limit: 100
        })
        if (e.target.value.length > 0) {
            fetchMore({
                variables: {
                    expression: e.target.value,
                    limit: 100
                },
                updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                    return fetchMoreResult
                },
            })
        }
    }

    return <StyledContainer>
        <Search onClick={handleChange} color='gray'/>
        <StyledInput defaultValue={variables.expression} placeholder={C.txts.en.explore.input} onChange={e => handleChange(e)} />
    </StyledContainer>
}