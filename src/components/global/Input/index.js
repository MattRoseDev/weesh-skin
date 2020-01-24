import React from 'react'
import styled, { css } from 'styled-components'
import CONSTANTS from 'Root/constants'
import Input from './Input'
import Icon from 'Root/components/global/Icon'

const StyledContainer = styled.div`
    margin: .5rem 0 0;
    display: flex;
    ${({width}) => width && css`
        width: ${width}%;
    `};
`

const StyledFrame = styled.div`
    /* border: 1px solid ${CONSTANTS.themes.light.colors.lightGray}; */
    ${CONSTANTS.styles.boxShadow.primary.normal}
    background: ${CONSTANTS.themes.light.colors.white};
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: .5rem;
    padding: .75rem;
`

const Element = (props) => {
    return <StyledContainer {...props}>
        <StyledFrame>
            {props.icon && <Icon icon={props.icon} color={'gray'} />}
            <Input {...props} />
        </StyledFrame>
    </StyledContainer>
}

export default Element