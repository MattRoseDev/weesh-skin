import React from 'react'
import styled, { css } from 'styled-components'
import Comment from 'Root/components/global/Comment'
import uuid from 'uuid'
import { WeeshPageContext } from 'Root/contexts/weeshPage'
import moment from 'moment'
import helpers from 'Root/helpers'
import C from 'Root/constants'
import Link from 'Root/components/global/Link'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumn};
    width: 100%;
    ${({isChild}) => !isChild && css`
        padding: .75rem 0 0;
    `};
`

const StyledMain = styled.p`
    color: ${({ theme }) => theme.colors.foreground};
    font-size: .85rem;
    /* ${({ isChild }) => isChild ? css`
        padding: 0 .75rem .25rem;
    ` : css` */
        padding: .25rem .75rem .25rem;
    /* `}; */
    line-height: 1.125rem;
`

const StyledUsername = styled.strong`
    font-size: .85rem;
    padding: 0 .25rem 0 0;
    color: ${({ theme }) => theme.colors.foreground};
`

const StyledChild = styled.div``

const StyledFooter = styled.div`
    padding: 0 .5rem .75rem .75rem;
`

const StyledReply = styled.button`
    color: ${({theme}) => theme.colors.gray};
    background: none;
    border: none;
    font-weight: bold;
    font-size: .75rem;
    cursor: pointer;
`

const StyledDate = styled.span`
    color: ${({theme}) => theme.colors.gray};
    font-size: .75rem;
`

export default (props) => {
    const { weeshPage, dispatch: weeshPageDispatch } = React.useContext(WeeshPageContext)
    
    const handleReply = () => {
        weeshPageDispatch({
            type: 'SET_REPLY',
            data: props
        })
        weeshPage.textarea.current.focus()
    }
    return <StyledContainer {...props}>
        <StyledMain>
            <Link to={`/${props.user.username}`}>
                <StyledUsername {...props}>
                    {props.user.username}
                </StyledUsername>
            </Link>
            {props.content}
        </StyledMain>
        <StyledFooter>
            <StyledDate>
                {helpers.dateFormat(moment(props.updatedAt).fromNow(true))}
            </StyledDate>
            {!props.isChild && <StyledReply onClick={handleReply}>Reply</StyledReply>}
        </StyledFooter>
        <StyledChild>
            {props.children && props.children.weeshComments.length > 0 && props.children.weeshComments.map(comment => (<Comment isChild={true} key={uuid()} {...comment} />))}
        </StyledChild>
    </StyledContainer>
}