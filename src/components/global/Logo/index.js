import React from 'react'
import styled, {css} from 'styled-components'
import {Link} from 'react-router-dom'
import C from 'Root/constants'

const Logo = styled(Link)`
    color: ${({theme}) => theme.colors.primary};
    text-decoration: none;
    ${C.styles.flex.inlineFlexRow};
    font-family: Autumn_in_November;
    margin: ${({margin}) => margin || 'unset'};
    font-size: ${({fontSize}) => fontSize || 1.5}rem;
    ${({padding}) =>
        padding
            ? css`
                  padding: ${padding};
              `
            : css`
                  padding: 0.5rem;
              `};
    /* background: linear-gradient(to right, #9a12b3, #663399); */
    /* background-image: linear-gradient(-45deg, #42275a, #e73c7e, #3a7bd5, #3a6073) !important; */
    /* background-image: linear-gradient(45deg, #FE0944, #FEAE96) !important; */
    /* background-image: linear-gradient(315deg, #045de9 0%, #09c6f9 74%); */
    /* -webkit-background-clip: text !important; */
    /* -webkit-text-fill-color: transparent !important; */
    /* background-size: 400% 400%; */
    /* animation: gradient 100s ease infinite; */
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`

export default props => {
    return (
        <Logo to='/' {...props}>
            {C.txts.en.g.logo}
        </Logo>
    )
}
