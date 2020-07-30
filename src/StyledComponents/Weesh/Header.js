import styled, { css } from 'styled-components'
import C from 'Root/constants'

const LeftSide = styled.div`
    ${C.styles.flex.flexRow};
`

const NameContainer = styled.div`
    ${C.styles.flex.flexColumn};
    margin: 0 0 0 0.5rem;
`

const Username = styled.small`
    font-size: 0.75rem;
    ${C.styles.flex.flexRow};
    color: ${({ theme }) => theme.colors.dark};
`

export default {
    Username,
    LeftSide,
    NameContainer,
}