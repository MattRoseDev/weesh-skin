import React from 'react'
import styled from 'styled-components'
import CONSTANTS from 'Root/constants'

const StyledOR = styled.div`
    display: flex;
    align-items: center;
    width: ${({ width }) => width ? `${width}%` : 'unset' };
    margin: ${({ margin }) => margin ? `${margin}rem` : 'auto' } 0;
`

const StyledLine = styled.div`
    height: 1px;
    background: ${CONSTANTS.themes.light.colors.light};
    flex-grow: 1;
`

const StyledLabel = styled.div`
    margin: 0 1rem;
    font-size: .75rem;
    color: ${CONSTANTS.themes.light.colors.gray};
`

const Element = (props) => {
    return <StyledOR {...props} >
        <StyledLine />
        <StyledLabel>{CONSTANTS.txts.en.general.or}</StyledLabel>
        <StyledLine />
    </StyledOR>
}

export default Element