import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import { WeeshContext } from 'Root/contexts/weesh'
import uuid from 'uuid'

const StyledContainer = styled.div`
    
`

const StyledTags = styled.div`
    display: block;
    ${C.styles.scrollbar.hide};
    width: ${({ width }) => width || 'unset'};
    padding: .5rem;
    background: ${({ theme }) => theme.colors.background};
    overflow-x: scroll;
    border-bottom: 1px dashed ${({ theme }) => theme.colors.light};
`

const StyledTag = styled.span`
    display: inline;
    color: ${({theme}) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50rem;
    padding: .25rem .5rem;
    font-weight: bold;
    font-size: .75rem;
    cursor: pointer;
    &:not(:last-child) {
        margin: .5rem .5rem .5rem 0;
    }
`

export default (props) => {
    const { weesh, dispatch } = React.useContext(WeeshContext)
    
    const handleCompleteTag = ({ title }) => {
        let spacePosition = weesh.textarea.current.value.substr(weesh.textarea.current.selectionStart).indexOf(' ')
        spacePosition = spacePosition == -1 ? 0 : spacePosition
        let weeshContent = weesh.textarea.current.value.substr(0, weesh.textarea.current.selectionStart + spacePosition)
        let weeshContentArray = weeshContent.split(C.regexes.weesh)
        if (weeshContentArray[weeshContentArray.length - 1] == '') {
            weeshContentArray[weeshContentArray.length - 2] = `#${title}`
            weeshContent = weeshContentArray.join('')
            dispatch({
                type: 'ADD_WEESH', data: {
                    content: `${weeshContent} `,
                    suggestionTags: [],
                    allowShowSuggestions: false
                }
            })
            weesh.textarea.current.value = `${weeshContent} `
        }
        weesh.textarea.current.focus()
    }
    return <StyledContainer>
        {weesh.suggestionTags.length > 0 && <StyledTags {...props}>
            {weesh.suggestionTags.map(tag =>
                <Tag handleCompleteTag={handleCompleteTag} {...tag} key={uuid()} />)}
        </StyledTags>}
    </StyledContainer>
}

const Tag = (props) => {
    return <StyledTag onClick={() => props.handleCompleteTag({title: props.title})}>
        #{props.title}
    </StyledTag>
}