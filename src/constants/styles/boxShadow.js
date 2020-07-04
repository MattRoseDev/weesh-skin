import {css} from 'styled-components'
import themes from 'Root/constants/themes'

const primary = {
    bold: css`
        /* box-shadow: 0 0 3px 1px ${({theme}) => theme.colors.boldShadow}; */
        border: 1px solid ${({theme}) => theme.colors.boldShadow};
    `,
    normal: css`
        /* box-shadow: 0 0 2px 1px ${({theme}) => theme.colors.shadow}; */
        border: 1px solid ${({theme}) => theme.colors.shadow};
    `,
    straight: css`
        /* box-shadow: 0 0 2px 1px ${({theme}) => theme.colors.shadow}; */
        border: 1px solid ${({theme}) => theme.colors.shadow};
    `,
    small: css`
        box-shadow: 0 1px 3px ${({theme}) => theme.colors.light};
    `,
}

export default {
    primary,
}
