import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import C from 'Root/constants'

const StyledContainer = styled.div`
    ${({ visible, contentPosition }) => {
        if (!visible) {
            return css`
                display: none;
            `
        } else {
            if (!contentPosition || contentPosition == 'center') {
                return css`
                    ${C.styles.flex.flexColumnCenter};
                `
            } else if (contentPosition == 'top') {
                return css`
                    ${C.styles.flex.flexColumn};
                    ${C.styles.flex.justifyContentStart};
                    ${C.styles.flex.alignItemsCenter};
                `
            }
        }
    }};
    ${C.styles.position.positionFixedZiro};
    padding-top: 5rem;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
`
const StyledContent = styled.div`
    overflow: hidden;
    ${C.styles.flex.flexColumnCenter};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    border-radius: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    ${({ width }) =>
        width &&
        css`
            width: ${width};
        `};
    ${({ padding }) =>
        padding &&
        css`
            padding: ${padding};
        `};
`

const StyledButton = styled.button`
    width: 100%;
    ${C.styles.flex.flexRowCenter};
    background: ${({ theme }) => theme.colors.background};
    font-size: 0.875rem;
    vertical-align: middle;
    border: none;
    border-top: 1px dashed ${({ theme }) => theme.colors.lightGray};
    color: ${({ color, theme }) => theme.colors[color || 'foreground']};
    padding: 0.85rem;
    ${({ fontWeight }) =>
        fontWeight &&
        css`
            font-weight: ${fontWeight};
        `};
    margin: 0;
    cursor: pointer;
`

export default props => {
    return (
        <StyledContainer
            visible={props.visible || undefined}
            contentPosition={props.contentPosition || undefined}
            onClick={e => {
                if (e.target == e.currentTarget) {
                    props.toggleDialogFunction(false)
                }
            }}>
            <StyledContent
                padding={props.padding || undefined}
                width={props.width || undefined}>
                {props.children}
            </StyledContent>
        </StyledContainer>
    )
}

export const DialogButton = props => {
    return (
        <StyledButton
            onClick={props.onClick || undefined}
            fontWeight={props.fontWeight || undefined}
            color={props.color || undefined}>
            {props.children}
        </StyledButton>
    )
}
