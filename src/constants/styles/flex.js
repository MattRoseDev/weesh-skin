import { css } from 'styled-components'

const s = {
    flex: css`
        display: flex;
    `,
    inlineFlex: css`
        display: inline-flex;
    `,
    row: css`
        flex-direction: row;
    `,
    rowReverse: css`
        flex-direction: row-reverse;
    `,
    column: css`
        flex-direction: column;
    `,
    columnReverse: css`
        flex-direction: column-reverse;
    `,
    flexWrap: css`
        flex-wrap: wrap;
    `,
    justifyContentCenter: css`
        justify-content: center;
    `,
    justifyContentStart: css`
        justify-content: flex-start;
    `,
    justifyContentEnd: css`
        justify-content: flex-end;
    `,
    justifyContentStretch: css`
        justify-content: stretch;
    `,
    justifyContentBetween: css`
        justify-content: space-between;
    `,
    justifyContentAround: css`
        justify-content: space-around;
    `,
    alignItemsCenter: css`
        align-items: center;
    `,
    alignItemsStart: css`
        align-items: flex-start;
    `,
    alignItemsEnd: css`
        align-items: flex-end;
    `,
    alignItemsStretch: css`
        align-items: stretch;
    `,
    alignItemsBetween: css`
        align-items: space-between;
    `,
    alignItemsAround: css`
        align-items: space-around;
    `,
    alignSelfCenter: css`
        align-self: center;
    `,
    alignSelfStart: css`
        align-self: flex-start;
    `,
    alignSelfEnd: css`
        align-self: flex-end;
    `,
    alignSelfStretch: css`
        align-self: stretch;
    `,
    alignSelfBetween: css`
        align-self: space-between;
    `,
    alignSelfAround: css`
        align-self: space-around;
    `,
}

const flexRow = css`
    ${s.flex};
    ${s.row};
`
const flexRowReverse = css`
    ${s.flex};
    ${s.rowReverse};
`
const flexColumn = css`
    ${s.flex};
    ${s.column};
`
const flexColumnReverse = css`
    ${s.flex};
    ${s.columnReverse};
`
const inlineFlexRow = css`
    ${s.inlineFlex};
    ${s.row};
`
const inlineFlexRowReverse = css`
    ${s.inlineFlex};
    ${s.rowReverse};
`
const inlineFlexColumn = css`
    ${s.inlineFlex};
    ${s.column};
`
const inlineFlexColumnReverse = css`
    ${s.inlineFlex};
    ${s.columnReverse};
`
const center = css`
    ${s.justifyContentCenter};
    ${s.alignItemsCenter};
`
const flexRowCenter = css`
    ${flexRow};
    ${center};
`
const flexColumnCenter = css`
    ${flexColumn};
    ${center};
`

export default {
    flexRow,
    flexRowReverse,
    flexColumn,
    flexColumnReverse,
    inlineFlexRow,
    inlineFlexRowReverse,
    inlineFlexColumn,
    inlineFlexColumnReverse,
    center,
    flexRowCenter,
    flexColumnCenter,
    flexWrap: s.flexWrap,
    justifyContentCenter: s.justifyContentCenter,
    justifyContentStart: s.justifyContentStart,
    justifyContentEnd: s.justifyContentEnd,
    justifyContentStretch: s.justifyContentStretch,
    justifyContentBetween: s.justifyContentBetween,
    justifyContentAround: s.justifyContentAround,
    alignItemsCenter: s.alignItemsCenter,
    alignItemsStart: s.alignItemsStart,
    alignItemsEnd: s.alignItemsEnd,
    alignItemsStretch: s.alignItemsStretch,
    alignItemsBetween: s.alignItemsBetween,
    alignItemsAround: s.alignItemsAround,
    alignSelfCenter: s.alignSelfCenter,
    alignSelfStart: s.alignSelfStart,
    alignSelfEnd: s.alignSelfEnd,
    alignSelfStretch: s.alignSelfStretch,
    alignSelfBetween: s.alignSelfBetween,
    alignSelfAround: s.alignSelfAround,
}
