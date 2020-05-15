import React from 'react'
import styled from 'styled-components'
import Icon from 'Root/components/global/Icon'
import Cover from 'Root/components/global/Cover'
import Avatar from 'Root/components/global/Avatar'
import { TagContext } from 'Root/contexts/tag'
import C from 'Root/constants'

const StyledHeader = styled.div`
    position: relative;
    ${C.styles.flex.flexRowCenter};
    padding: 2rem 2rem;
`

const StyledTag = styled.div`
    width: 100%;
    font-weight: bold;
    word-break: break-word;
`

export default (props) => {
    return <StyledHeader>
        <StyledTag>
            Bookmarks
        </StyledTag>
    </StyledHeader>
}