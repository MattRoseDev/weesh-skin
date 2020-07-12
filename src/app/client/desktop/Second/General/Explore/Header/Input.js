import React from 'react'
import styled from 'styled-components'
import { ExploreContext } from 'Root/contexts/explore'
import C from 'Root/constants'
import IconButton from 'Root/components/global/IconButton'
import { useLazyQuery } from '@apollo/react-hooks'
import api from 'Root/api'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    background: ${({ theme }) => theme.colors.background};
    border-radius: 0.75rem;
    padding: 0.25rem 0.5rem;
    ${C.styles.boxShadow.primary.normal};
    width: 100%;
`

const StyledInput = styled.input`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
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
    const { explore, dispatch } = React.useContext(ExploreContext)
    const [variables, setVariables] = React.useState(initVariables)
    const [timer, setTimer] = React.useState(0)

    const [exploreAll, { error, data, called, loading }] = useLazyQuery(
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

    const handleKeyUp = (e) => {
        clearTimeout(timer)
        setTimer(setTimeout(handleSearch(e.target.value), 1000))
    }

    const handleSearch = expression => {
        dispatch({
            type: 'EXPLORE',
            data: {
                expression,
                loading,
            },
        })
        setVariables({
            expression,
            limit: 5,
        })
        if (expression.length > 0) {
            exploreAll()
        }
    }

    return (
        <StyledContainer>
            <IconButton icon='Search' onClick={handleSearch} color='gray' />
            <StyledInput
                placeholder={C.txts.en.explore.input}
                onKeyUp={e => handleKeyUp(e)}
            />
        </StyledContainer>
    )
}
