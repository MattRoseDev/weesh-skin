import React from 'react'
import styled from 'styled-components'
import CONSTANTS from 'Root/constants'

const StyledInput = styled.input`
    outline: none;
    border: none;
    background: transparent;
    font-size: .75rem;
    color: ${CONSTANTS.themes.light.colors.black};
    padding: 0 0 0 .2rem;
    width: 100%;
    ::placeholder {
        color: ${CONSTANTS.themes.light.colors.gray};
    }
`

const Element = (props) => {
    return <StyledInput 
        placeholder={props.placeholder} 
        type={props.type} 
        onChange={props.onChange}
    />
}

export default Element