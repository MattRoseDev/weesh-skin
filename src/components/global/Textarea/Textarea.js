import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'

const StyledTextarea = styled.textarea`
    outline: none;
    border: none;
    background: transparent;
    font-size: .85rem;
    color: ${({theme}) => theme.colors.foreground};
    background: ${({ theme }) => theme.colors.background};
    padding: 0 0 0 .2rem;
    resize: vertical;
    width: 100%;
    ::placeholder {
        color: ${({theme}) => theme.colors.gray};
    }
`

export default (props) => {
    return <StyledTextarea 
        placeholder={props.placeholder} 
        type={props.type} 
        onKeyUp={props.onChange}
        onInput={props.onInput}
        defaultValue={props.value || ''}
    />
}