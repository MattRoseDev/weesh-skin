import React from 'react'
import styled from 'styled-components'
import { AuthContext } from 'Root/contexts/auth'
import CONSTANTS from 'Root/constants'

const StyledFullName = styled.h4`
    display: inline-flex;
    font-weight: bold;
    font-size: ${({fontSize}) => fontSize ? `${fontSize}rem` : '1rem'};
    color: ${CONSTANTS.themes.light.colors.black};
    margin: 0 0 .1rem;
`

export default (props) => {
    const { auth } = React.useContext(AuthContext)
    return <>
        {props.user.unknown.fullname && auth.id != props.user.id ?
            <StyledFullName {...props}>
                {CONSTANTS.txts.en.g.unknownPerson}
            </StyledFullName> :
            <StyledFullName {...props}>
                {props.user.firstName} {props.user.lastName}
            </StyledFullName>
        }
    </>
}