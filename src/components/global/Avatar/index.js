import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import avatar from 'Root/public/img/avatar.jpg'
import unknownAvatar from 'Root/public/img/unknownAvatar.png'
import C from 'Root/constants'
import config from 'Root/config'

const StyledLink = styled(Link)`
    color: unset;
    text-decoration: none;
`

const StyledContainer = styled.span`
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsCenter};
`

const StyledAvatar = styled.span`
    background-color: ${({ theme }) => theme.colors.white};
    background-image: url(${({ user }) =>
        user
            ? user.unknown.avatar
                ? unknownAvatar
                : user.avatarAddress
                ? `${config.UPLOAD_URL}${user.avatarAddress}`
                : avatar
            : avatar});
    width: ${({ size }) => size || 2}rem;
    height: ${({ size }) => size || 2}rem;
    border-width: ${({ borderwidth }) => borderwidth || 1}px;
    border-style: solid;
    border-color: ${({ theme, bordercolor }) =>
        bordercolor ? theme.colors[bordercolor] : theme.colors.lightGray};
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsCenter};
    ${({ theme, boxShadow }) =>
        boxShadow &&
        css`
            box-shadow: 1px 1px 3px 1px ${theme.colors[boxShadow]};
        `}
`

const StyledImg = styled.img`
    display: none;
`

export default props => {
    return (
        <>
            {props.to ? (
                <StyledLink to={props.to}>
                    <StyledAvatar {...props} />
                    <StyledImg
                        src={
                            props.user &&
                            props.user.unknown &&
                            props.user.unknown.avatar
                                ? unknownAvatar
                                : undefined
                        }
                    />
                </StyledLink>
            ) : (
                <StyledContainer to={props.to}>
                    <StyledAvatar {...props} />
                    <StyledImg
                        src={
                            props.user &&
                            props.user.unknown &&
                            props.user.unknown.avatar
                                ? unknownAvatar
                                : undefined
                        }
                    />
                </StyledContainer>
            )}
        </>
    )
}
