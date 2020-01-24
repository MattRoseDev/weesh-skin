import React from 'react'
import styled, { css } from 'styled-components'
import IconButton from 'Root/components/global/IconButton'
import Icon from 'Root/components/global/Icon'
import CONSTANTS from 'Root/constants'
import uuid from 'uuid'

const StyledFooter = styled.div`
    margin: .25rem;
    color: ${CONSTANTS.themes.light.colors.dark};
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const StyledButtonContainer = styled.span`
    padding: 0 .5rem .5rem ;
`

const StyledButtons = styled.div`
    display: flex;
    align-items: center;
    margin: 0 .75rem 0 0;
`

const StyledNumberContainer = styled.span`
    display: flex;
    align-items: center;
    ${({ margin }) => margin && css`
        margin: ${margin};
    `};
`

const StyledNumbers = styled.div`
    display: flex;
    align-items: center;
`

const StyledNumber = styled.span`
    display: flex;
    align-items: center;
    font-size: .75rem;
    margin: 0 0 0 .1rem;
`

const buttons = [
    {
        icon: 'Bookmark',
        handleClick: () => console.log('Bookmark')
    },
    {
        icon: 'MessageCircle',
        handleClick: () => console.log('MessageCircle')
    },
    {
        icon: 'Heart',
        handleClick: () => console.log('Heart')
    },
]


const Element = (props) => {
    const numbers = [
        {
            number: props.likes.number,
            icon: 'Heart',
        },
        {
            number: props.comments.number,
            icon: 'MessageCircle',
        },
    ]
    return <StyledFooter>
        <StyledNumbers>
            {buttons.map(item => (<StyledButtonContainer key={uuid()}>
                <IconButton icon={item.icon} size={24} strokeWidth={1.75} />
            </StyledButtonContainer>))}
        </StyledNumbers>
        <StyledButtons>
            {numbers.map(item => (item.number > 0 && <StyledNumberContainer key={uuid()} margin={'0 0 0 .75rem'}>
                <Icon icon={item.icon} size={12} fill={CONSTANTS.themes.light.colors.dark} />
                <StyledNumber>{item.number}</StyledNumber>
            </StyledNumberContainer>))}
        </StyledButtons>
    </StyledFooter>
}

export default Element