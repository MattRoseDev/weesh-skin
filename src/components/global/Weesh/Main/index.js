import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AuthContext } from 'Root/contexts/auth'
import C from 'Root/constants'
import uuid from 'uuid'
import useHistory from 'Root/hooks/useHistory'
import Convertors from 'Root/components/global/Convertors'

const StyledLink = styled.div`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.foreground};
    cursor: default;
`

const StyledMain = styled.p`
    font-size: 0.85rem;
    line-height: 1.125rem;
    padding: 0.75rem 1.25rem 0.5rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: pre-wrap;
    user-select: text !important;
    color: ${({ theme }) => theme.colors.foreground};
`

const StyledTag = styled(Link)`
    color: ${({ theme }) => theme.colors.primary};
    ${C.styles.flex.inlineFlexRow};
    text-decoration: none;
`
export default props => {
    const [content, setContent] = React.useState(null)
    const history = useHistory()
    React.useEffect(() => {
        if (!content) {
            setContent(
                Convertors.Weesh({
                    content: props.content,
                }),
            )
        }
    })

    const handleClick = e => {
        e.target == e.currentTarget && history.push(`/w/${props.link}`)
    }

    return (
        props.content && (
            <StyledMain onClick={e => handleClick(e)}>{content}</StyledMain>
        )
    )
}
