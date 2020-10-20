import styled, { css } from "styled-components"
import C from "Root/constants"

const Clipboard = styled.textarea`
    height: 0;
    width: 0;
    resize: none;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.background};
`

export default {
    Clipboard,
}
