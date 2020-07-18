import React from 'react'
import styled, { css } from 'styled-components'
import cover from 'Root/public/img/cover.png'
import config from 'Root/config'

const StyledContainerCover = styled.div`
    height: ${({ height }) => (height ? `${height}` : '10rem')};
`

const StyledCover = styled.div`
    ${({ user }) => {
        if (user && user.coverAddress) {
            return css`
                background-image: url(${`${config.UPLOAD_URL}${user.coverAddress}`});
            `
        } else {
            return css`
                background-image: url(${`${cover}`});
            `
        }
    }};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
`

const StyledImg = styled.img`
    height: 100%;
    display: none;
`

export default props => {
    return (
        <StyledContainerCover {...props}>
            <StyledCover src={cover} {...props} />
            {/* <StyledImg src={cover} /> */}
        </StyledContainerCover>
    )
}
