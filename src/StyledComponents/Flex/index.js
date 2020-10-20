import styled, { css } from "styled-components"
import C from "Root/constants"

const Row = styled.div`
    ${C.styles.flex.flexRow};
    ${({ padding }) =>
        padding &&
        css`
            padding: ${padding};
        `};
    ${({ margin }) =>
        margin &&
        css`
            margin: ${margin};
        `};
`

const Column = styled.div`
    ${C.styles.flex.flexColumn};
    ${({ padding }) =>
        padding &&
        css`
            padding: ${padding};
        `};
    ${({ margin }) =>
        margin &&
        css`
            margin: ${margin};
        `};
`

export default {
    Row,
    Column,
}
