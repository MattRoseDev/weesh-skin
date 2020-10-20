import React from "react"
import { ReactSVG } from "react-svg"
import styled, { css } from "styled-components"
import C from "Root/constants"
import StyledComponents, { Components } from "Root/StyledComponents"

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsStart};
    /* border: 1px solid ${({ theme }) => theme.colors.light}; */
    /* border-radius: .5rem; */
    padding: 1rem;
    width: ${window.innerWidth > 960 ? "50%" : "100%"};
    box-sizing: border-box;
    ${({ disable }) =>
        disable
            ? css`
                  cursor: not-allowed;
              `
            : css`
                  cursor: pointer;
              `};
    
`

export default props => {
    return (
        <StyledContainer
            disable={props.disable || undefined}
            onClick={props.handleClick || undefined}>
            <ReactSVG
                src={props.icon}
                beforeInjection={svg => {
                    svg.setAttribute(
                        "style",
                        `width: ${props.width}px;height: ${props.height}px;fill:${props.color}`,
                    )
                }}
            />
            <StyledComponents.Flex.Column margin="0 0 0 1rem">
                <StyledComponents.Flex.Column>
                    <StyledComponents.Title
                        color={props.disable ? "gray" : undefined}
                        margin="0 0 .25rem"
                        fontWeight="bold">
                        {props.title}
                    </StyledComponents.Title>
                    <StyledComponents.Description
                        margin="0 0 .5rem"
                        color="gray"
                        fontSize=".85rem">
                        {props.description}
                    </StyledComponents.Description>
                </StyledComponents.Flex.Column>

                {props.value && (
                    <Components.Global.Diamond
                        width={18}
                        value={props.value}
                        fontSize="1.25rem"
                        paddingValue=".5rem .25rem 0 0"
                        grayscale={props.disable ? "1" : undefined}
                        margin="-.75rem 0 0"
                    />
                )}
            </StyledComponents.Flex.Column>
        </StyledContainer>
    )
}
