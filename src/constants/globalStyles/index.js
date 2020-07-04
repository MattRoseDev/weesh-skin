import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
    body {
        background: ${({theme}) => theme.colors.background};
        color: ${({theme}) => theme.colors.foreground};
    }
`
