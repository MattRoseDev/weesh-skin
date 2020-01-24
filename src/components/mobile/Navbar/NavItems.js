import React from 'react'
import styled from 'styled-components'
import CONSTANTS from 'Root/constants'

const NavItems = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* margin: 1rem; */
    padding: .125rem;
    /* border-radius: 2rem 2rem 0 0; */
    box-shadow: 1px 1px 3px 1px ${CONSTANTS.themes.light.colors.lightGray};
    background: ${CONSTANTS.themes.light.colors.white};
    .active {
        transform: scale(1.25);
    }
`

const Element = (props) => {
    return <NavItems>
        {props.children}
    </NavItems>
}

export default Element
