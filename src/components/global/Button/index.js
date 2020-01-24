import React from 'react'
import styled from 'styled-components'
import CONSTANTS from 'Root/constants'
import Icon from 'Root/components/global/Icon'

const StyledContainer = styled.div`
    margin: ${({ margin }) => margin || 'unset'};
    width: ${({ width }) => width ? `${width}%` : 'unset'};
    display: flex;
`

const StyledButton = styled.button`
    background: ${CONSTANTS.themes.light.colors.black};
    box-shadow: 1px 1px 3px 1px ${CONSTANTS.themes.light.colors.light};
    /* border: 1px solid ${CONSTANTS.themes.light.colors.white}; */
    border: none;
    color: ${CONSTANTS.themes.light.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: .75rem;
    width: 100%;
    font-size: .85rem;
    padding: ${({ padding }) => padding || 'unset'};
    outline: none;
`

const Element = (props) => {
    return <StyledContainer {...props}>
        <StyledButton padding={props.padding}>
            {props.icon && <Icon icon={props.icon} />}
            {props.children}
        </StyledButton>
    </StyledContainer>
}

export default Element