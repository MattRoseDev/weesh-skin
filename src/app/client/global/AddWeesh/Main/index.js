import React from 'react'
import styled from 'styled-components'
import { WeeshContext } from 'Root/contexts/weesh'
import C from 'Root/constants'
import uuid from 'uuid'
import Convertors from 'Root/components/global/Convertors'
import Tag from 'Root/components/global/Tag'
import { useLazyQuery } from '@apollo/react-hooks'
import api from 'Root/api'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentCenter};
    position: relative;
    background: ${({ theme }) => theme.colors.background};
    margin: .75rem ;
    height: 15rem;
`

const StyledInput = styled.textarea`
    position: absolute;
    background: transparent;
    color: rgba(0,0,0,0); 
    caret-color: ${({ theme }) => theme.colors.foreground};
    ${C.styles.position.positionAbsoluteZiro};
    font-size: 1rem;
    border: none;
    z-index: 1;
    white-space: pre-wrap;
    resize: none;
    padding: 0;
    width: 100%;
`

const StyledOutput = styled.div`
    position: absolute;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    white-space: pre-wrap;
    ${C.styles.position.positionAbsoluteZiro};
    font-size: 1rem;
    z-index: 0;
`

const StyledTag = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    ${C.styles.flex.inlineFlexRow};
`

export default (props) => { 
    const { weesh, dispatch } = React.useContext(WeeshContext)
    const [state, setState] = React.useState([])
    const [getSuggestion, { data, error}] = useLazyQuery(api.tags.suggestion)
    
    const frontInput = React.useRef()

    React.useEffect(() => {
        if(!weesh.textarea) {
            dispatch({
                type: 'ADD_WEESH', data: {
                    textarea: frontInput,
                }
            })
        }
        if (frontInput.current && weesh.content.length < 1) {
            setState([])
            frontInput.current.value = ''
        }
        if (data && weesh.allowShowSuggestions) {
            dispatch({
                type: 'ADD_WEESH', data: {
                    suggestionTags: data.exploreAllForUser ? data.exploreAllForUser.tag.tags : [],
                }
            })
        }
        setOutput()
    }, [props.weesh.content, data])

    const handleChange = (e) => {

        let spacePosition = frontInput.current.value.substr(frontInput.current.selectionStart).indexOf(' ')
        spacePosition = spacePosition == -1 ? 0 : spacePosition
        let weeshContent = frontInput.current.value.substr(0, frontInput.current.selectionStart + spacePosition)
        
        let tags = weeshContent.split(C.regexes.weesh)
        console.log(`'${weeshContent}'`,tags)
        if (tags && tags.length > 2 && tags[tags.length - 1] == '' && tags[tags.length - 2].startsWith('#')) {
            getSuggestion({
                variables: {
                    expression: `${tags[tags.length - 2].substr(1)}`
                }
            })
            dispatch({
                type: 'ADD_WEESH', data: {
                    allowShowSuggestions: true
                }
            })
        } else {
            console.log('no')
            dispatch({
                type: 'EMPTY_SUGGESTION_TAGS'
            })
        }

        let characterCount = frontInput.current.value.length
        dispatch({type: 'ADD_WEESH', data: {
            content: frontInput.current.value,
            characterCount
        }})
        setOutput()
    }
    
    const setOutput = () => {
        let template = frontInput.current.value.split(C.regexes.weesh)

        template = template.map(item => {
            if (item[0] == '#' && item.length > 1) {
                item = <Tag to={`/t/${item.substr(1)}`} key={uuid()}>{item}</Tag>
            }
            return item
        })

        setState(template)
    }

    return <StyledContainer>
        <StyledInput placeholder='I Weesh ...' autoFocus={true} ref={frontInput} contentEditable={true} suppressContentEditableWarning={true} onInput={e => handleChange(e)} ></StyledInput>
        <StyledOutput>{state}</StyledOutput>
    </StyledContainer>
}

