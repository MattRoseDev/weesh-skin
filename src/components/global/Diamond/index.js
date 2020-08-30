import React from 'react'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import diamond from 'Root/public/icons/diamond.svg'

const StyledContainer = styled.span`
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsCenter};
    ${({ margin }) =>
        margin &&
        css`
            margin: ${margin};
        `};
    ${({ sign }) =>
        sign &&
        sign == -1 &&
        css`
            filter: grayscale(1);
        `};
    ${({ grayscale }) =>
        grayscale &&
        css`
            filter: ${`grayscale(${grayscale})`};
        `};
`

const StyledValue = styled.span`
    ${({ fontSize }) =>
        fontSize &&
        css`
            font-size: ${fontSize};
        `};
    ${({ paddingValue }) =>
        paddingValue &&
        css`
            padding: ${paddingValue};
        `};
    ${({ marginValue }) =>
        marginValue &&
        css`
            margin: ${marginValue};
        `};
    background: linear-gradient(to right top, #0ba7dd, #68e9ff);
    -webkit-background-clip: text !important;
    background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-size: 100% 100%;
    font-family: Autumn_in_November;
    font-weight: bolder;
    overflow: hidden;
`

export default props => {
    const sign = props.sign !== false && Math.sign(props.value)
    return (
        <StyledContainer
            margin={props.margin || undefined}
            grayscale={props.grayscale || undefined}
            sign={sign || undefined}>
            {props.value !== undefined && (
                <StyledValue
                    fontSize={props.fontSize || undefined}
                    paddingValue={props.paddingValue || undefined}
                    marginValue={props.marginValue || undefined}>
                    {sign == 1 ? '+' : ''}
                    {props.value}
                </StyledValue>
            )}
            <img src={diamond} width={props.width || 20} />
        </StyledContainer>
    )
}
