import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import Avatar from 'Root/components/global/Avatar'
import FullName from 'Root/components/global/FullName'
import MoreButton from './MoreButton'
import Link from 'Root/components/global/Link'

const StyledHeader = styled.div`
    padding: .75rem .75rem 0;
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
`

const StyledNameContainer = styled.div`
    ${C.styles.flex.flexColumn};
    margin: 0 0 0 .5rem;
`

const StyledUsername = styled.small`
    ${C.styles.flex.flexRow};
    font-size: .75rem;
    color: ${({theme}) => theme.colors.dark};
`

const StyledLeftSide = styled.div`
    ${C.styles.flex.flexRow};
`

export default (props) => {
    return <StyledHeader>
        <StyledLeftSide>
            <Avatar to={`/${props.user.username}`} {...props} />
            {props.user && <Link to={`/${props.user.username}`}>
                <StyledNameContainer>
                    <FullName {...props} fontSize={1} />
                    <StyledUsername>@{props.user.username}</StyledUsername>
                </StyledNameContainer>
            </Link>}
        </StyledLeftSide>
        <MoreButton {...props}/>
    </StyledHeader>
}