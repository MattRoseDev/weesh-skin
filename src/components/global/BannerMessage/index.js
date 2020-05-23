import React from 'react'
import styled, { css } from 'styled-components'
import Icon from 'Root/components/global/Icon'
import C from 'Root/constants'


const StyledContainer = styled.div`
    color: ${({theme}) => theme.colors.foreground};
    ${C.styles.flex.flexColumnCenter};
    height: ${({height}) => height || '100'}%;
    ${({ padding }) => padding && css`
        padding: ${padding};
    `};
`

const StyledIcon = styled.span`
    ${C.styles.flex.inlineFlexRow};
    padding: 1rem;
    border: 2px solid ${({theme}) => theme.colors.foreground};
    border-radius: 50%;
`

const StyledTitle = styled.div`
    margin: 1.5rem 0;
    font-weight: bold;
`

const StyledMessage = styled.div`
    text-align: center;
    color: ${({theme}) => theme.colors.gray};
    font-size: .85rem;
`

export default (props) => {
    return <StyledContainer {...props}>
        <StyledIcon>
            <Icon icon={props.icon} color='foreground' strokeWidth={1} size={60}/>
        </StyledIcon>
        {props.title && <StyledTitle>{props.title}</StyledTitle>}
        {props.message && <StyledMessage>{props.message}</StyledMessage>}
    </StyledContainer>
}
