import React from 'react'
import styled from 'styled-components'
import cover from 'Root/public/img/cover.png'
import config from 'Root/config'

const StyledContainerCover = styled.div`
    height: ${({ height }) => (height ? `${height}` : '10rem')};
`

const StyledCover = styled.div`
    background-image: url(${({ user }) =>
        user && user.coverAddress
            ? `${config.UPLOAD_URL}${user.coverAddress}`
            : cover});
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
