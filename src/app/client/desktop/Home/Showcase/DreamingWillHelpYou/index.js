import React from 'react'
import styled from 'styled-components'
import Loading from 'Root/components/global/Loading'
import C from 'Root/constants'
import { useQuery } from '@apollo/react-hooks'
import api from 'Root/api'
import uuid from 'uuid'
import Link from 'Root/components/global/Link'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRowCenter};
    width: 40rem;
    flex-wrap: wrap;
    padding: 0 0.5rem 0.5rem;
`

export default () => {
    return <StyledContainer></StyledContainer>
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
