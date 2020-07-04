import React from 'react'
import styled from 'styled-components'
import {ExploreContext} from 'Root/contexts/explore'
import C from 'Root/constants'
import {Search} from 'react-feather'
import {useLazyQuery} from '@apollo/react-hooks'
import api from 'Root/api'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    background: ${({theme}) => theme.colors.background};
    border-radius: 0.75rem;
    padding: 0.25rem 0.5rem;
    ${C.styles.boxShadow.primary.normal};
    width: 100%;
`

const StyledInput = styled.input`
    background: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.foreground};
    line-height: 1.5rem;
    font-size: 0.825rem;
    outline: none;
    border: none;
    padding: 0.25rem;
    width: 100%;
`

const initVariables = {
    expression: '',
}

export default () => {
    const {explore, dispatch} = React.useContext(ExploreContext)
    const [variables, setVariables] = React.useState(initVariables)

    const [exploreAll, {error, data, called, loading}] = useLazyQuery(
        api.explore.exploreAll,
        {
            variables,
        },
    )

    React.useEffect(() => {
        if (error) {
            console.log(error)
        }
        if (called && data) {
            const result = data.exploreAllForUser
            dispatch({
                type: 'EXPLORE',
                data: {
                    results: result
                        ? [...result.user.users, ...result.tag.tags]
                        : null,
                    loading,
                },
            })
        }
    }, [data])

    const handleChange = e => {
        dispatch({
            type: 'EXPLORE',
            data: {
                expression: e.target.value,
                loading,
            },
        })
        setVariables({
            expression: e.target.value,
            limit: 5,
        })
        if (e.target.value.length > 0) {
            exploreAll()
        }
    }

    return (
        <StyledContainer>
            <Search onClick={handleChange} color='gray' />
            <StyledInput
                placeholder={C.txts.en.explore.input}
                onChange={e => handleChange(e)}
            />
        </StyledContainer>
    )
}
