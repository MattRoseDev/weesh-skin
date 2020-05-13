import React from 'react'
import styled, { css } from 'styled-components'
import Header from './Header'
import Main from './Main'
import C from 'Root/constants'

const StyledComment = styled.div`
    ${C.styles.flex.flexRow};
    border: none;
    &:not(:first-child) {
        ${({ isChild }) => !isChild && css`
        border-top: 1px dashed ${({theme}) => theme.colors.lightGray};
        `};
    }
`

export default (props) => {
    const isChild = props.isChild || false
    return <StyledComment id={props.id} isChild={isChild}>
        <Header {...props}/>
        <Main {...props}/>
    </StyledComment>
}
