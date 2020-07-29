import React from 'react'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import { WeeshContext } from 'Root/contexts/weesh'
import uuid from 'uuid'
import StyledComponents, { Components } from 'Root/StyledComponents'
import helpers from 'Root/helpers'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.scrollbar.hide};
    width: ${({ width }) => width || 'unset'};
    padding: 0.5rem;
    background: ${({ theme }) => theme.colors.background};
    overflow-x: scroll;
    border-bottom: 1px dashed ${({ theme }) => theme.colors.light};
`

const StyledBlock = styled.div`
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsCenter};
    padding: 0 0.5rem 0 0;
`

const StyledItem = styled.span`
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsCenter};
    width: ${({ width }) => width || 'unset'};
    background: ${({ theme }) => theme.colors.background};
    overflow-x: scroll;
    border: 1px solid ${({ theme }) => theme.colors.light};
    ${({ padding }) => css`
        padding: ${padding};
    `};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: 0.5rem;
    &:hover {
        background: ${({ theme }) => theme.colors.lightPrimary};
        border: 1px solid ${({ theme }) => theme.colors.lightPrimary};
        transition: all 0.2s ease;
    }
    cursor: pointer;
`

const StyledContent = styled.span`
    ${C.styles.flex.inlineFlexColumn};
    padding: 0 0 0 0.25rem;
`

const StyledTag = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    padding: 0 0.25rem 0 0;
    font-size: 0.95rem;
`

const StyledNumber = styled.span`
    color: ${({ theme }) => theme.colors.gray};
    font-weight: normal;
    white-space: nowrap;
    font-size: 0.75rem;
`

const StyledUserTitle = styled.span`
    color: ${({ theme }) => theme.colors.dark};
    font-weight: normal;
    font-size: 0.75rem;
`

export default props => {
    const { weesh, dispatch } = React.useContext(WeeshContext)

    const handleClick = value => {
        console.log(value)
    }

    return (
        <>
            {weesh.suggestions.length > 0 && (
                <StyledContainer {...props}>
                    {weesh.suggestionType == 'TAG' &&
                        weesh.suggestions.map(tag => (
                            <Tag
                                {...tag}
                                key={uuid()}
                                handleClick={value => handleClick(value)}
                            />
                        ))}
                    {weesh.suggestionType == 'USER' &&
                        weesh.suggestions.map(user => (
                            <User
                                {...user}
                                key={uuid()}
                                handleClick={value => handleClick(value)}
                            />
                        ))}
                </StyledContainer>
            )}
        </>
    )
}

const Tag = props => {
    return (
        <StyledBlock onClick={() => props.handleClick(props.title)}>
            <StyledItem padding='.3rem'>
                <StyledContent>
                    <StyledTag>#{props.title}</StyledTag>
                    <StyledNumber>
                        {helpers.labelFormat({
                            single: 'weesh',
                            plural: 'weeshes',
                            number: props.counter,
                        })}
                    </StyledNumber>
                </StyledContent>
            </StyledItem>
        </StyledBlock>
    )
}

const User = props => {
    return (
        <StyledBlock onClick={() => props.handleClick(props.username)}>
            <StyledItem padding='.25rem .5rem'>
                <Components.Global.Avatar user={props} size={1.5} />
                <StyledContent>
                    <Components.Global.FullName user={props} fontSize={0.85} />
                    <StyledUserTitle>@{props.username}</StyledUserTitle>
                </StyledContent>
            </StyledItem>
        </StyledBlock>
    )
}
