import React from 'react'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import Avatar from 'Root/components/global/Avatar'
import Link from 'Root/components/global/Link'


const StyledHeader = styled.div`
    ${({ isChild }) => !isChild && css`
        padding: .75rem 0 0 .75rem;
    `};
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
`

const StyledNameContainer = styled.div`
    ${C.styles.flex.flexColumn};
    margin: 0 0 0 .5rem;
`

const StyledUsername = styled.small`
    font-size: .75rem;
    ${C.styles.flex.flexRow};
    color: ${({theme}) => theme.colors.dark};
`

const StyledTimestamp = styled.small`
    font-size: .75rem;
    color: ${({theme}) => theme.colors.dark};
    margin: 0 .25rem 0 0;
`

const StyledLeftSide = styled.div`
    ${C.styles.flex.flexRow};
`

const StyledRightSide = styled.div``

export default (props) => {
    return <StyledHeader {...props}>
        <Link to={`/${props.user.username}`}>
            <Avatar size={1.75} user={props.user} />
        </Link>
    </StyledHeader>
}
