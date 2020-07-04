import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'

const NavItems = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentAround};
    ${C.styles.flex.alignItemsCenter};
    /* margin: 1rem; */
    padding: 0 0.125rem;
    /* border-radius: 2rem 2rem 0 0; */
    box-shadow: 1px 1px 3px 1px ${({ theme }) => theme.colors.light};
    background: ${({ theme }) => theme.colors.background};
`

export default props => {
    return <NavItems>{props.children}</NavItems>
}
