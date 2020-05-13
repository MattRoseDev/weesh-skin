import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'

const StyledInput = styled.input`
    outline: none;
    border: none;
    font-size: .75rem;
    color: ${({theme}) => theme.colors.foreground};
    background: transparent;
    padding: 0 0 0 .2rem;
    width: 100%;
    ::placeholder {
        color: ${({ theme }) => theme.colors.gray};
    }
`

export default (props) => {
    return <StyledInput 
        id={props.id}
        placeholder={props.placeholder} 
        type={props.type} 
        onChange={props.onChange}
        onInput={props.onInput}
        defaultValue={props.value || ''}
        autoCorrect='off'
    />
}