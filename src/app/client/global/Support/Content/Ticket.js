import React from 'react'
import styled, { css } from 'styled-components'
import StyledComponents, { Components } from 'Root/StyledComponents'
import C from 'Root/constants'
import helpers from 'Root/helpers'
import moment from 'moment'
import { AuthContext } from 'Root/contexts/auth'

const StyledContainer = styled(Components.Global.Link)`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentCenter};
    padding: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
    width: 100%;
`

const StyledContent = styled.p`
    color: ${({ theme }) => theme.colors.foreground};
    padding: 0 0 0.5rem;
`

const StyledFooter = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    ${C.styles.flex.justifyContentBetween};
`

const StyledBadge = styled.span`
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    width: 0.75rem;
    height: 0.75rem;
`

export default props => {
    const { auth } = React.useContext(AuthContext)
    return (
        <StyledContainer to={`/support/${props.link}`}>
            <StyledComponents.Title
                fontWeight='bold'
                fontSize='1.125rem'
                margin='0 0 .25rem'>
                {props.subject}
            </StyledComponents.Title>
            <StyledContent>
                {props.message.ticketMessages[0].message.replace(/\n/g, ' ')}
            </StyledContent>
            <StyledFooter>
                <StyledComponents.Title color='gray' fontSize='.75rem'>
                    {helpers.dateFormat(moment(props.createdAt).fromNow(true))}{' '}
                    · #{props.link}
                </StyledComponents.Title>
                {!props.message.ticketMessages[0].read &&
                    props.message.ticketMessages[0].user.id != auth.id && (
                        <StyledBadge />
                    )}
            </StyledFooter>
        </StyledContainer>
    )
}
