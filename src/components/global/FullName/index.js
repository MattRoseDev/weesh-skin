import React from "react"
import styled, { css } from "styled-components"
import { AuthContext } from "Root/contexts/auth"
import C from "Root/constants"
import Official from "Root/public/icons/official.png"

const StyledImg = styled.img`
    padding: 0 0 0 0.15rem;
`

const StyledContainer = styled.span`
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsCenter};
    ${({ padding }) =>
        padding &&
        css`
            padding: ${padding};
        `};
    ${({ margin }) =>
        margin &&
        css`
            margin: ${margin};
        `};
    font-weight: bold;
    font-size: ${({ fontSize }) => (fontSize ? fontSize : "1rem")};
    color: ${({ theme }) => theme.colors.foreground};
    margin: 0 0 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    user-select: text;
`

const StyledFullName = styled.strong`
    ${({ padding }) =>
        padding &&
        css`
            padding: ${padding};
        `};
    ${({ margin }) =>
        margin &&
        css`
            margin: ${margin};
        `};
    ${({ width }) =>
        width &&
        css`
            max-width: ${width};
        `};
    font-weight: bold;
    font-size: ${({ fontSize }) => (fontSize ? fontSize : "1rem")};
    color: ${({ theme }) => theme.colors.foreground};
    margin: 0 0 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    user-select: text;
`

export default props => {
    const { auth } = React.useContext(AuthContext)
    return (
        <>
            {props.user.unknown.fullname && auth.id != props.user.id ? (
                <StyledContainer
                    padding={props.padding || undefined}
                    margin={props.margin || undefined}>
                    <StyledFullName
                        fontSize={props.fontSize || undefined}
                        width={props.width || undefined}>
                        {C.txts.en.g.unknownPerson}
                    </StyledFullName>
                </StyledContainer>
            ) : (
                <StyledContainer
                    padding={props.padding || undefined}
                    margin={props.margin || undefined}>
                    <StyledFullName
                        fontSize={props.fontSize || undefined}
                        width={props.width || undefined}>
                        {props.user.firstName} {props.user.lastName}
                    </StyledFullName>
                    {props.user.label == "official" && (
                        <StyledImg
                            src={Official}
                            width={props.labelSize || 15}
                        />
                    )}
                </StyledContainer>
            )}
        </>
    )
}
