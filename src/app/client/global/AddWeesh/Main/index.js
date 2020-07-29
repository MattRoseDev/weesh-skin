import React from 'react'
import styled from 'styled-components'
import { WeeshContext } from 'Root/contexts/weesh'
import C from 'Root/constants'
import Editor from 'draft-js-plugins-editor'
import { EditorState, ContentState } from 'draft-js'
import { useLazyQuery } from '@apollo/react-hooks'
import api from 'Root/api'
import createLinkifyPlugin from 'draft-js-linkify-plugin'

const StyledContainer = styled.div`
    & * {
        color: ${({ theme }) => theme.colors.foreground};
    }
    background: ${({ theme }) => theme.colors.background};
    margin: 0.75rem;
`

const StyledPrimary = styled.span`
    & * {
        color: ${({ theme }) => theme.colors.primary};
    }
`

export default props => {
    const { weesh, dispatch } = React.useContext(WeeshContext)
    const [initComponent, setInitComponent] = React.useState(false)

    const MENTION_REGEX = /@[\w]+/g
    const HASHTAG_REGEX = /#[\w\u0590-\u05ff]+/g

    const mentionStrategy = (contentBlock, callback, contentState) => {
        findWithRegex(MENTION_REGEX, contentBlock, callback)
    }

    const hashtagStrategy = (contentBlock, callback, contentState) => {
        findWithRegex(HASHTAG_REGEX, contentBlock, callback)
    }

    const findWithRegex = (regex, contentBlock, callback) => {
        const text = contentBlock.getText()
        let matchArr, start
        while ((matchArr = regex.exec(text)) !== null) {
            start = matchArr.index
            callback(start, start + matchArr[0].length)
        }
    }

    const linkifyPlugin = createLinkifyPlugin({
        component: linkProps => (
            <StyledPrimary>{linkProps.children}</StyledPrimary>
        ),
    })

    const plugins = [linkifyPlugin]

    const decorators = [
        {
            strategy: mentionStrategy,
            component: mentionProps => (
                <StyledPrimary data-offset-key={mentionProps.offsetKey}>
                    {mentionProps.children}
                </StyledPrimary>
            ),
        },
        {
            strategy: hashtagStrategy,
            component: hashtagProps => (
                <StyledPrimary data-offset-key={hashtagProps.offsetKey}>
                    {hashtagProps.children}
                </StyledPrimary>
            ),
        },
    ]

    const initText = '' + weesh.content

    const [state, setState] = React.useState({
        editorState: EditorState.createWithContent(
            ContentState.createFromText(initText),
        ),
    })

    const [getTagSuggestion, getTagSuggestionResponse] = useLazyQuery(
        api.tags.suggestion,
    )
    const [getUserSuggestion, getUserSuggestionResponse] = useLazyQuery(
        api.users.suggestion,
    )

    React.useEffect(() => {
        const { data } = getTagSuggestionResponse
        if (data && weesh.allowShowSuggestions) {
            console.log(data.exploreAllForUser)
            dispatch({
                type: 'ADD_WEESH',
                data: {
                    suggestions: data.exploreAllForUser
                        ? data.exploreAllForUser.tag.tags
                        : [],
                },
            })
        }
    }, [getTagSuggestionResponse.data])

    React.useEffect(() => {
        const { data } = getUserSuggestionResponse
        if (data && weesh.allowShowSuggestions) {
            console.log(data.exploreAllForUser)
            dispatch({
                type: 'ADD_WEESH',
                data: {
                    suggestions: data.exploreAllForUser
                        ? data.exploreAllForUser.user.users
                        : [],
                },
            })
        }
    }, [getUserSuggestionResponse.data])

    const handleChange = editorState => {
        setState({ editorState })
        handleCursorPosition(editorState)
        dispatch({
            type: 'ADD_CONTENT',
            data: {
                content: editorState.getCurrentContent().getPlainText(''),
            },
        })
    }

    const handleCursorPosition = editorState => {
        let selectionState = editorState.getSelection()
        let anchorKey = selectionState.getAnchorKey()
        let currentContent = editorState.getCurrentContent()
        let currentContentBlock = currentContent.getBlockForKey(anchorKey)
        let start = selectionState.getStartOffset()
        let text = currentContentBlock.getText().slice(0, start).split(' ')
        let expression = text[text.length - 1]
        console.log(expression)
        if (expression.match(/^#[\w]/gi)) {
            getTagSuggestion({
                variables: {
                    expression: `${expression.substr(1)}`,
                },
            })
            dispatch({
                type: 'ADD_WEESH',
                data: {
                    allowShowSuggestions: true,
                    suggestionType: 'TAG',
                },
            })
        } else if (expression.match(/^@[\w]/gi)) {
            getUserSuggestion({
                variables: {
                    expression: `${expression.substr(1)}`,
                },
            })
            dispatch({
                type: 'ADD_WEESH',
                data: {
                    allowShowSuggestions: true,
                    suggestionType: 'USER',
                },
            })
        } else {
            dispatch({
                type: 'EMPTY_SUGGESTION',
            })
        }
    }

    return (
        <StyledContainer>
            <Editor
                decorators={decorators}
                editorState={state.editorState}
                onChange={handleChange}
                plugins={plugins}
            />
        </StyledContainer>
    )
}
