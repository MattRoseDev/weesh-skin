import React from 'react'
import Together from 'Root/public/img/showcase/together.svg'
import ChatBubbles from 'Root/public/img/showcase/chat-bubbles.svg'
import CloudStorage from 'Root/public/img/showcase/cloud-storage.svg'
import Smoke from 'Root/public/img/showcase/smoke.svg'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import { ReactSVG } from 'react-svg'
import { AuthContext } from 'Root/contexts/auth'
import uuid from 'uuid'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.center};
    ${C.styles.flex.flexWrap};
    margin: 1rem 0 2rem;
`
const StyledItem = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.center};
    margin: 0 0 3rem;
    width: 10rem;
    color: ${({ theme }) => theme.colors.foreground};
`
const StyledContent = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.center};
    color: ${({ theme }) => theme.colors.foreground};
    padding: 0.75rem 0 0;
`
const StyledTitle = styled.h3`
    font-size: 1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.foreground};
`
const StyledDescription = styled.p`
    font-size: 0.75rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.foreground};
`

export default () => {
    const { auth } = React.useContext(AuthContext)
    const details = [
        {
            icon: Smoke,
            title: 'Wishes are written',
            description: 'Post whatever you want.',
            width: 75,
            height: 75,
        },
        {
            icon: Together,
            title: 'Others exprience',
            description: 'Use the help of others.',
            width: 75,
            height: 75,
        },
        {
            icon: CloudStorage,
            title: 'Safe and Secret',
            description: 'We protect your weeshes.',
            width: 75,
            height: 75,
        },
        {
            icon: ChatBubbles,
            title: 'Give advice',
            description: 'Comment on weeshes.',
            width: 75,
            height: 75,
        },
    ]

    return (
        <StyledContainer>
            {details.map(detail => (
                <Item
                    key={uuid()}
                    {...detail}
                    color={C.themes[`${auth.theme}`].colors.foreground}
                />
            ))}
        </StyledContainer>
    )
}

const Item = props => {
    return (
        <StyledItem>
            <ReactSVG
                src={props.icon}
                beforeInjection={svg => {
                    svg.setAttribute(
                        'style',
                        `width: ${props.width}px;height: ${props.height}px;fill:${props.color}`,
                    )
                }}
            />
            <StyledContent>
                <StyledTitle>{props.title}</StyledTitle>
                <StyledDescription>{props.description}</StyledDescription>
            </StyledContent>
        </StyledItem>
    )
}
