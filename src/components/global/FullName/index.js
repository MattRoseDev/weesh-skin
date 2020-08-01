import React from 'react'
import styled from 'styled-components'
import { AuthContext } from 'Root/contexts/auth'
import C from 'Root/constants'

const StyledFullName = styled.h4`
    ${C.styles.flex.inlineFlex};
    font-weight: bold;
    font-size: ${({ fontSize }) => (fontSize ? `${fontSize}rem` : '1rem')};
    color: ${({ theme }) => theme.colors.foreground};
    margin: 0 0 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    user-select: text;
`

export default props => {
    const { auth } = React.useContext(AuthContext)
    return (
        <>
            {props.user.unknown.fullname && auth.id != props.user.id ? (
                <StyledFullName fontSize={props.fontSize || undefined}>
                    {C.txts.en.g.unknownPerson}
                </StyledFullName>
            ) : (
                <StyledFullName fontSize={props.fontSize || undefined}>
                    {props.user.firstName} {props.user.lastName}
                </StyledFullName>
            )}
        </>
    )
}
