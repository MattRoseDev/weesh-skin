import React from 'react'
import styled, {css} from 'styled-components'
import C from 'Root/constants'
import Loader from 'Root/components/global/Loader'

const StyledContaner = styled.div`
    height: 100%;
    width: 100%;
    ${C.styles.flex.flexRowCenter};
    ${C.styles.flex.justifyContentCenter};
    background: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.dark};
    ${({padding}) =>
        padding &&
        css`
            padding: ${padding};
        `};
`

export default props => {
    return (
        <StyledContaner {...props}>
            <Loader {...props} />
        </StyledContaner>
    )
}
