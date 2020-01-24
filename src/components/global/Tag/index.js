import React from 'react'
import styled, { css } from 'styled-components'
import CONSTANTS from 'Root/constants'
import Icon from 'Root/components/global/Icon'

const StyledTag = styled.span`
    display: inline-flex;
    align-items: center;
    color: ${CONSTANTS.themes.light.colors.blue};
    border: 1px solid ${CONSTANTS.themes.light.colors.blue};
    padding: 2px .4rem 2px .25rem;
    ${({margin}) => margin ? css`
        margin: ${margin};
    ` : css`
        margin: 0 .5rem 0 0;
    `};
    border-radius: 50rem;
    font-size: .9rem;
`

const Tag = (props) => {
    return <StyledTag {...props}>
        <Icon icon={'Hash'} color={CONSTANTS.themes.light.colors.blue} size={14} />
        {props.children}
    </StyledTag>
}

export default Tag