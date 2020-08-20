import React from 'react'
import styled, { css } from 'styled-components'
import Icon from 'Root/components/global/Icon'
import Cover from 'Root/components/global/Cover'
import Avatar from 'Root/components/global/Avatar'
import { TagContext } from 'Root/contexts/tag'
import C from 'Root/constants'
import helpers from 'Root/helpers'

const StyledHeader = styled.div`
    position: relative;
    ${C.styles.flex.flexColumn};
    padding: 1rem;
    overflow: hidden;
`

const StyledTag = styled.div`
    width: 100%;
    font-size: ${window.innerWidth < 960 ? '2rem' : '3rem'};
    font-weight: bold;
    background: ${({ theme }) =>
        `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.deepPrimary})`};
    -webkit-background-clip: text !important;
    background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    word-break: break-word;
`
const StyledNumber = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem 0 0;
    color: ${({ theme }) => theme.colors.gray};
    /* word-break: break-word; */
`

export default props => {
    return (
        <StyledHeader>
            <StyledTag
                fontSize={props.match.params.tagTitle.length || undefined}>
                #{props.match.params.tagTitle}
            </StyledTag>
            <StyledNumber>
                {helpers.labelFormat({
                    single: 'weesh',
                    plural: 'weeshes',
                    number: props.tag.paginate.totalDocs,
                })}
            </StyledNumber>
        </StyledHeader>
    )
}
