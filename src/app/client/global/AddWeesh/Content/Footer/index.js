import React from 'react'
import styled, { css } from 'styled-components'
import Button from 'Root/components/global/Button'
import Icon from 'Root/components/global/Icon'
import { WeeshContext } from 'Root/contexts/weesh'
import C from 'Root/constants'
import { useMutation } from '@apollo/react-hooks'
import api from 'Root/api'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsEnd};
    ${C.styles.flex.justifyContentBetween};
    padding: 0 1rem;
`

const StyledButtonTitle = styled.span`
    margin: 0 .5rem 0 0;
    font-weight: bold;
`

const StyledNumbers = styled.div`
    ${C.styles.flex.flexRow};
    ${(props) => 
        props.characterCount <= props.totalCount ?
        css`
            color: ${({theme}) => theme.colors.gray};
        ` :
        css`
            color: ${({theme}) => theme.colors.red};
        `
    };
`

const StyledNumber = styled.span`
    color: inherit;
    ${C.styles.flex.inlineFlexRow};
`

export default () => {
    const { weesh, dispatch } = React.useContext(WeeshContext)

    const [addWeesh, { data, error, loading }] = useMutation(api.weeshes.add)
    
    const handleAddWeesh = () => addWeesh({
        variables: {
            content: weesh.content,
            status: weesh.status,
        }
    })

    React.useEffect(() => {
        if (error) {
            console.log(error)
        }
        if (data) {
            const res = data.addWeeshForUser
            dispatch({ type: 'ADD_WEESH', data:{
                content: ''
            }})
            console.log(res)
        }
    }, [data])

    return <StyledContainer>
        <StyledNumbers {...weesh}>
            <StyledNumber>{weesh.characterCount}</StyledNumber>
            /
            <StyledNumber>{weesh.totalCount}</StyledNumber>
        </StyledNumbers>
        <Button color='background' background='primary' boxShadow='light' clickEvent={handleAddWeesh} isLoading={loading || undefined} padding='.5rem 1rem' radius='50rem'>
            <StyledButtonTitle>
                Weesh
            </StyledButtonTitle>
            <Icon icon='PenTool' color='background' />
        </Button>
    </StyledContainer>
}

