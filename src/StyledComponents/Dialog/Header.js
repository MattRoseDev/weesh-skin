import styled, { css } from 'styled-components'
import C from 'Root/constants'

const Message = styled.div`
    color: ${({ theme }) => theme.colors.foreground};

    text-align: center;
    ${({ padding }) =>
        padding &&
        css`
            padding: ${padding};
        `};
    ${({ fontWeight }) =>
        fontWeight &&
        css`
            font-weight: ${fontWeight};
        `};
`
const Container = styled.div`
    color: ${({ theme }) => theme.colors.foreground};
    ${C.styles.flex.flexColumnCenter};
    ${({ padding }) =>
        padding &&
        css`
            padding: ${padding};
        `};
`

export default {
    Message,
    Container,
}
