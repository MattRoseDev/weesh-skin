import React from 'react'
import styled, { css } from 'styled-components'
import { AuthContext } from 'Root/contexts/auth'
import C from 'Root/constants'
import Official from 'Root/public/icons/official.png'

const StyledImg = styled.img`
    padding: 0 0 0 0.15rem;
`

const StyledFullName = styled.strong`
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
    font-size: ${({ fontSize }) => (fontSize ? fontSize : '1rem')};
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
                <StyledFullName
                    padding={props.padding || undefined}
                    margin={props.margin || undefined}
                    fontSize={props.fontSize || undefined}>
                    {C.txts.en.g.unknownPerson}
                </StyledFullName>
            ) : (
                <StyledFullName
                    padding={props.padding || undefined}
                    margin={props.margin || undefined}
                    fontSize={props.fontSize || undefined}>
                    {props.user.firstName} {props.user.lastName}
                    {props.user.label == 'official' && (
                        <StyledImg
                            src={Official}
                            width={props.labelSize || 15}
                        />
                    )}
                </StyledFullName>
            )}
        </>
    )
}
