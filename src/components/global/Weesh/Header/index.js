import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import Avatar from 'Root/components/global/Avatar'
import moment from 'moment'
import FullName from 'Root/components/global/FullName'
import Link from 'Root/components/global/Link'
import helpers from 'Root/helpers'
import useHistory from 'Root/hooks/useHistory'

const StyledHeader = styled.div`
    padding: 0.75rem 0.75rem 0;
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
`

const StyledNameContainer = styled.div`
    ${C.styles.flex.flexColumn};
    margin: 0 0 0 0.5rem;
`

const StyledUsername = styled.small`
    font-size: 0.75rem;
    ${C.styles.flex.flexRow};
    color: ${({ theme }) => theme.colors.dark};
`

const StyledTimestamp = styled.small`
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.dark};
    margin: 0 0.25rem 0 0;
`

const StyledLeftSide = styled.div`
    ${C.styles.flex.flexRow};
`

const StyledRightSide = styled.div``

export default props => {
    const history = useHistory()

    const handleClick = e => {
        e.target == e.currentTarget && history.push(`/w/${props.link}`)
    }

    return (
        <StyledHeader onClick={e => handleClick(e)}>
            {props.user && (
                <StyledLeftSide>
                    <Avatar to={`/${props.user.username}`} {...props} />
                    {props.user && (
                        <StyledNameContainer>
                            <Link to={`/${props.user.username}`}>
                                <FullName {...props} fontSize={0.85} />
                            </Link>
                            <Link to={`/${props.user.username}`}>
                                <StyledUsername>
                                    @{props.user.username}
                                </StyledUsername>
                            </Link>
                        </StyledNameContainer>
                    )}
                </StyledLeftSide>
            )}
            {props.updatedAt && (
                <StyledRightSide>
                    <StyledTimestamp>
                        {helpers.dateFormat(
                            moment(props.createdAt).fromNow(true),
                        )}
                        {`${
                            props.updatedAt == props.createdAt
                                ? ''
                                : ' · edited'
                        }`}
                    </StyledTimestamp>
                </StyledRightSide>
            )}
        </StyledHeader>
    )
}
