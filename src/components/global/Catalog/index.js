import React from 'react'
import Together from 'Root/public/img/showcase/together.svg'
import ChatBubbles from 'Root/public/img/showcase/chat-bubbles.svg'
import CloudStorage from 'Root/public/img/showcase/cloud-storage.svg'
import Spark from 'Root/public/img/showcase/spark.svg'
import Woman from 'Root/public/img/showcase/woman.svg'
import Smoke from 'Root/public/img/showcase/smoke.svg'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import { ReactSVG } from 'react-svg'
import { AuthContext } from 'Root/contexts/auth'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.center};
    ${C.styles.flex.flexWrap};

`
const StyledItem = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.center};
    width: 10rem;
    margin: 0 0 3rem;
    color: ${({ theme }) => theme.colors.foreground};
`
const StyledContent = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.center};
    color: ${({ theme }) => theme.colors.foreground};
    padding: .75rem 0 0;
`
const StyledTitle = styled.h3`
    font-size: 1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.foreground};
`
const StyledDescription = styled.p`
    font-size: .75rem;
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
            description: 'Comment on wishes.',
            width: 75,
            height: 75,
        },
    ]


    return (
        <StyledContainer>
            {details.map(detail => <Item {...detail} color={C.themes[`${auth.theme}`].colors.foreground}/>)}
        </StyledContainer>
    )
}

const Item = (props) => {
    return <StyledItem>
        <ReactSVG src={props.icon} beforeInjection={svg => {
            svg.setAttribute('style', `width: ${props.width}px;height: ${props.height}px;fill:${props.color}`)
        }} />
        {/* <img src={props.icon} width={props.width} height={props.height} /> */}
        <StyledContent>
            <StyledTitle>
                {props.title}
            </StyledTitle>
            <StyledDescription>
                {props.description}
            </StyledDescription>
        </StyledContent>
    </StyledItem>
}
