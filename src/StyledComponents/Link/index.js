import styled, { css } from "styled-components"
import C from "Root/constants"
import Link from "Root/components/global/Link"

const Item = styled(Link)`
    color: ${({ theme }) => theme.colors.primary} !important;
    ${({ fontWeight }) =>
        fontWeight &&
        css`
            font-weight: ${fontWeight};
        `};
    user-select: text !important;
`

const Anchor = styled.a`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary} !important;
    user-select: text !important;
`
export default {
    Item,
    Anchor,
}
