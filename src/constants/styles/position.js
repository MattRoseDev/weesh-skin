import {css} from 'styled-components'

const s = {
    fixed: css`
        position: fixed;
    `,
    absolute: css`
        position: absolute;
    `,
    topZiro: css`
        top: 0;
    `,
    bottomZiro: css`
        bottom: 0;
    `,
    leftZiro: css`
        left: 0;
    `,
    rightZiro: css`
        right: 0;
    `,
}

const positionFixedZiro = css`
    ${s.fixed};
    ${s.topZiro};
    ${s.bottomZiro};
    ${s.leftZiro};
    ${s.rightZiro};
`
const positionAbsoluteZiro = css`
    ${s.absolute};
    ${s.topZiro};
    ${s.bottomZiro};
    ${s.leftZiro};
    ${s.rightZiro};
`

export default {
    positionFixedZiro,
    positionAbsoluteZiro,
}
