import { css } from 'styled-components'
import themes from 'Root/constants/themes'

const primary = {
    normal: css`
        box-shadow: 1px 1px 3px 1px ${themes.light.colors.light};
    `,
    small: css`
        box-shadow: 0 1px 3px rgba(50,50,93,.075), 0 1px 0 rgba(0,0,0,.01);
    `
}

export default {
    primary
}