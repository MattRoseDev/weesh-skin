import React from 'react'
import styled from 'styled-components'
import Avatar from 'Root/components/global/Avatar'
import FullName from 'Root/components/global/FullName'
import Icon from 'Root/components/global/Icon'
import Convertors from 'Root/components/global/Convertors'
import C from 'Root/constants'
import helpers from 'Root/helpers'
import moment from 'moment'
import parse from 'html-react-parser'
import uuid from 'uuid'
import Link from 'Root/components/global/Link'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsStart};
    ${C.styles.flex.justifyContentBetween};
    padding: 1rem 1rem 0;
`

const StyledMain = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.alignItemsStart};
    color: ${({ theme }) => theme.colors.foreground};
    padding: 0 0.5rem 0.5rem 0.5rem;
`

const StyledDescription = styled.div`
    color: ${({ theme }) => theme.colors.foreground};
    font-size: 0.85rem;
`

const StyledTime = styled.small`
    display: inline-block;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.dark};
`

const StyledUsername = styled.strong`
    color: ${({ theme }) => theme.colors.foreground};
    display: block;
    /* padding: 0 .25rem 0 0; */
`

const StyledYou = styled.strong`
    color: ${({ theme }) => theme.colors.foreground};
    display: inline;
    /* padding: 0 .25rem 0 0; */
`

const StyledContentContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsStart};
    line-height: 1.125rem;
`

const StyledContent = styled.span`
    padding: 0 0.125rem 0 0;
    color: ${({ theme }) => theme.colors.foreground};
    white-space: normal;
    word-break: break-word;
`

const StyledIcon = styled.span`
    ${C.styles.flex.flexRowCenter};
    border: 1px solid ${({ theme }) => theme.colors.dark};
    min-width: 2.75rem;
    min-height: 2.75rem;
    border-radius: 50rem;
`

const StyledGray = styled.span`
    color: ${({ theme }) => theme.colors.gray};
    white-space: pre-wrap;
    word-break: break-word;
`

export default props => {
    let template = props.notificationType.template.split(
        /(\$\$[0-9a-zA-Z_]+\$\$)(?!;)/gi,
    )

    template = template.map(element => switchElements({ element, props }))

    return (
        <StyledContainer>
            <StyledContentContainer>
                <Link to={`/${props.sender.username}`}>
                    <Avatar size={2.5} user={props.sender} />
                </Link>
                <Link to={props.url}>
                    <StyledMain>
                        <StyledDescription>
                            {template}
                            <StyledTime>
                                {helpers.dateFormat(
                                    moment(props.createdAt).fromNow(true),
                                )}
                            </StyledTime>
                        </StyledDescription>
                    </StyledMain>
                </Link>
            </StyledContentContainer>
            <Link to={props.url}>
                <StyledIcon>
                    {switchIcon(props.notificationType.type)}
                </StyledIcon>
            </Link>
        </StyledContainer>
    )
}

const switchIcon = type => {
    switch (type) {
        case 'like_weesh':
            return (
                <Icon icon='Heart' size={20} strokeWidth={1.5} color='dark' />
            )
        case 'like_weesh_comment':
            return (
                <Icon icon='Heart' size={20} strokeWidth={1.5} color='dark' />
            )
        case 'comment_weesh':
            return (
                <Icon
                    icon='MessageCircle'
                    size={20}
                    strokeWidth={1.5}
                    color='dark'
                />
            )
        case 'reply_comment':
            return (
                <Icon
                    icon='CornerUpRight'
                    size={20}
                    strokeWidth={1.5}
                    color='dark'
                />
            )
        case 'accept_follow_request':
            return (
                <Icon icon='Check' size={20} strokeWidth={1.5} color='dark' />
            )
        case 'start_following':
            return <Icon icon='Plus' size={20} strokeWidth={1.5} color='dark' />
        case 'welcome_message':
            return (
                <Icon icon='Inbox' size={20} strokeWidth={1.5} color='dark' />
            )
        case 'mention_in_weesh':
            return (
                <Icon icon='AtSign' size={20} strokeWidth={1.5} color='dark' />
            )
        case 'reweesh':
            return (
                <Icon icon='Repeat' size={20} strokeWidth={1.5} color='dark' />
            )
    }
}

const switchElements = ({ element, props }) => {
    if (element.length > 0) {
        switch (element) {
            case '$$username$$':
                return (
                    <StyledUsername key={uuid()}>
                        <FullName fontSize='0.85rem' user={props.sender} />
                    </StyledUsername>
                )
            case '$$weesh$$':
                return (
                    <StyledGray key={uuid()}>
                        {props.weesh &&
                            `${props.weesh.content
                                .replace(/\n/g, ' ')
                                .substr(0, 50)}${
                                props.weesh.content.length > 50 ? '... ' : ' '
                            }`}
                    </StyledGray>
                )
            case '$$comment$$':
                return (
                    <StyledContent key={uuid()}>
                        {props.comment &&
                            `${props.comment.content.replace(/\n/g, ' ')} `}
                    </StyledContent>
                )
            case '$$you$$':
                return (
                    <StyledYou key={uuid()}>
                        {props.recipient.firstName} {props.recipient.lastName}
                    </StyledYou>
                )
            default:
                return (
                    <StyledContent key={uuid()}>
                        {element.replace(/\n/g, ' ')}
                    </StyledContent>
                )
        }
    } else {
        return null
    }
}
