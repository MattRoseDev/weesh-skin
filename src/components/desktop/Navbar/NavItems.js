import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'

const NavItems = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.alignItemsStart};
    /* margin: 1rem; */
    padding: 0 .125rem;
    /* border-radius: 2rem 2rem 0 0; */
    transition: all .25s ease;
`

export default (props) => {
    return <NavItems>
        {props.children}
    </NavItems>
}
