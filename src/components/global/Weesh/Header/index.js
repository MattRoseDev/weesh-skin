import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import moment from 'moment'
import StyledComponents, { Components } from 'Root/StyledComponents'
import Link from 'Root/components/global/Link'
import helpers from 'Root/helpers'
import useHistory from 'Root/hooks/useHistory'

const StyledHeader = styled.div`
    padding: 0.75rem 0.75rem 0;
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
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
                <StyledComponents.Weesh.Header.LeftSide>
                    <Components.Global.Avatar
                        to={`/${props.user.username}`}
                        {...props}
                    />
                    {props.user && (
                        <StyledComponents.Weesh.Header.NameContainer>
                            <Link to={`/${props.user.username}`}>
                                <Components.Global.FullName
                                    {...props}
                                    fontSize={0.85}
                                    labelSize='16'
                                />
                            </Link>
                            <Link to={`/${props.user.username}`}>
                                <StyledComponents.Weesh.Header.Username>
                                    @{props.user.username}
                                </StyledComponents.Weesh.Header.Username>
                            </Link>
                        </StyledComponents.Weesh.Header.NameContainer>
                    )}
                </StyledComponents.Weesh.Header.LeftSide>
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
