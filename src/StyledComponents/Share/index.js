import styled, { css } from 'styled-components'
import C from 'Root/constants'

const Container = styled.div`
    ${C.styles.flex.flexRow};
    width: 100%;
`

const Item = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.alignItemsCenter};
    ${C.styles.flex.justifyContentBetween};
    width: 100%;
    background: transparent;
    padding: 0.75rem;
    border-radius: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.light};
    &:hover {
        background: ${({ theme }) => theme.colors.lightPrimary};
        border: 1px solid ${({ theme }) => theme.colors.lightPrimary};
        transition: all 0.2s ease;
    }
    margin: 0.5rem;

    cursor: pointer;
`

const ItemTitle = styled.span`
    padding: 0.25rem 0 0;
    font-size: 0.85rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
`

export default {
    Container,
    Item,
    ItemTitle,
}
