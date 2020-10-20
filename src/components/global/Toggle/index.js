import React from "react"
import styled from "styled-components"
import C from "Root/constants"

const StyledContainer = styled.label`
    position: relative;
    display: inline-block;
    width: 3rem;
    height: 1.75rem;
`

const StyledSwitch = styled.span`
    border: 1px solid ${({ theme }) => theme.colors.gray};
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 50rem;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all 0.25s ease;
    &:before {
        position: absolute;
        left: 0.25rem;
        bottom: 0.25rem;
        border-radius: 50%;
        content: "";
        width: 1.125rem;
        height: 1.125rem;
        background-color: ${({ theme }) => theme.colors.background};
        box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.gray};
        transition: all 0.25s ease;
    }
`

const StyledInput = styled.input`
    display: none;

    &:checked + ${StyledSwitch} {
        border: 1px solid ${({ theme }) => theme.colors.primary};
        background-color: ${({ theme }) => theme.colors.primary};
        &:before {
            box-shadow: unset;
            transform: translateX(20px);
        }
    }
`

export default props => {
    return (
        <StyledContainer>
            <StyledInput
                type="checkbox"
                defaultChecked={props.checked || undefined}
                onChange={props.onChange}
                onInput={props.onInput}
            />
            <StyledSwitch />
        </StyledContainer>
    )
}
