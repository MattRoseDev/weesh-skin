import React from 'react'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import { Components } from 'Root/StyledComponents'
import Link from 'Root/components/global/Link'

const StyledContainer = styled(Link)`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    ${({ margin }) =>
        margin &&
        css`
            margin: ${margin};
        `};
`

const StyledUsername = styled.span`
    color: ${({ color, theme }) => theme.colors.dark};
    padding: 0 0 0 0.25rem;
    ${({ fontSize }) =>
        fontSize &&
        css`
            font-size: ${fontSize};
        `};
    ${({ fontWeight }) =>
        fontWeight &&
        css`
            font-weight: ${fontWeight};
        `};
`

export default props => {
    return (
        <StyledContainer
            to={`/${props.user.username}`}
            margin={props.margin || undefined}>
            <Components.Global.Avatar
                user={props.user || undefined}
                size={props.size || 1}
            />
            <Components.Global.FullName
                fontSize={props.fontSize || undefined}
                padding='0 0 0 .25rem'
                user={props.user || undefined}
                width={props.width || undefined}
            />
        </StyledContainer>
    )
}
