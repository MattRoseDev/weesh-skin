import React from 'react'
import styled from 'styled-components'
import CONSTANTS from 'Root/constants'
import Avatar from 'Root/components/global/Avatar'

const StyledHeader = styled.div`
    padding: .75rem .75rem 0;
    display: flex;
    justify-content: space-between;
`

const StyledNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0 0 .5rem;
`

const StyledFullName = styled.h4`
    display: flex;
    font-weight: bold;
    font-size: .85rem;
    color: ${CONSTANTS.themes.light.colors.black};
    margin: 0 0 .1rem;
`

const StyledUsername = styled.small`
    font-size: .75rem;
    display: flex;
    color: ${CONSTANTS.themes.light.colors.dark};
`

const StyledTimestamp = styled.small`
    font-size: .75rem;
    color: ${CONSTANTS.themes.light.colors.dark};
    margin: 0 .25rem 0 0;
`

const StyledLeftSide = styled.div`
    display: flex;
`

const StyledRightSide = styled.div``

const Element = (props) => {
    return <StyledHeader>
            <StyledLeftSide>
                <Avatar />
                <StyledNameContainer>
                    <StyledFullName>{props.fullname}</StyledFullName>
                    <StyledUsername>@{props.username}</StyledUsername>
                </StyledNameContainer>
            </StyledLeftSide>
            <StyledRightSide>
                <StyledTimestamp>2 days ago</StyledTimestamp>
            </StyledRightSide>
    </StyledHeader>
}

export default Element