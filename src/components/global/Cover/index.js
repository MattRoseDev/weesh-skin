import React from 'react'
import styled from 'styled-components'
import cover from 'Root/public/img/cover.jpg'

const StyledContainerCover = styled.div`
    height: ${({height}) => height ? `${height}rem` : '10rem'};
`

const StyledCover = styled.div`
    background-image: url(${({src}) => src || cover});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
`

const StyledImg = styled.img`
    height: 100%;
    display: none;
`

const Element = (props) => {
    return <StyledContainerCover {...props}>
        <StyledCover src={cover} />
        <StyledImg src={cover} />
    </StyledContainerCover>
}

export default Element