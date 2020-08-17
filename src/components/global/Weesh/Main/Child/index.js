import React from 'react'
import styled from 'styled-components'
import useHistory from 'Root/hooks/useHistory'
import C from 'Root/constants'
import StyledComponents, { Components } from 'Root/StyledComponents'
import Convertors from 'Root/components/global/Convertors'
import Link from 'Root/components/global/Link'

const StyledContainer = styled(Link)``

const StyledChildContainer = styled(Link)`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.alignItemsStart};
    margin: 0.5rem 1.25rem 0.5rem;
    font-size: 0.85rem;
    border: 1px dashed ${({ theme }) => theme.colors.light};
    border-radius: 0.75rem;
`

const StyledChildContent = styled.p`
    padding: 0.75rem 1.25rem;
    font-size: 0.85rem;
    line-height: 1.125rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: pre-wrap;
    user-select: text !important;
    color: ${({ theme }) => theme.colors.foreground};
`

const StyledContent = styled.p`
    padding: 1rem 1.25rem 0.5rem;
    font-size: 0.85rem;
    line-height: 1.125rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: pre-wrap;
    user-select: text !important;
    color: ${({ theme }) => theme.colors.foreground};
`

export default props => {
    const [content, setContent] = React.useState(null)
    const history = useHistory()
    React.useEffect(() => {
        if (!content) {
            props.child.content &&
                setContent(
                    Convertors.Weesh({
                        content: props.child.content,
                    }),
                )
        }
    })

    return (
        content && (
            <>
                {props.content ? (
                    <StyledChildContainer to={`/w/${props.child.link}`}>
                        <Components.Global.User
                            fontSize='.85rem'
                            fontWeight='bold'
                            margin='.75rem 0 0 .75rem'
                            user={props.child.user}
                            size={1.25}
                        />
                        <StyledChildContent>{content}</StyledChildContent>
                    </StyledChildContainer>
                ) : (
                    <StyledContainer to={`/w/${props.link}`}>
                        <StyledContent>{content}</StyledContent>
                    </StyledContainer>
                )}
            </>
        )
    )
}
