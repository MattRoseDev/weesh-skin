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

    const handleChange = editorState => {
        setState({ editorState })
        dispatch({
            type: 'ADD_CONTENT',
            data: {
                content: editorState.getCurrentContent().getPlainText(''),
            },
        })
    }

    return (
        <StyledContainer>
            <Editor
                decorators={decorators}
                editorState={state.editorState}
                onChange={handleChange}
                plugins={plugins}
            />
            {weesh.content}
        </StyledContainer>
    )
}
