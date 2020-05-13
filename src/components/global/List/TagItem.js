import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import Link from 'Root/components/global/Link'
import Icon from 'Root/components/global/Icon'

const StyledTagContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
    ${C.styles.flex.alignItemsStretch};
    padding: .75rem .5rem;
    border-bottom: ${({ borderBottom }) => borderBottom || '0px'} dashed ${({ theme }) => theme.colors.light};
`

const StyledTagContent = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    padding: 0 .25rem;
`

const StyledMain = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentCenter};
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 0 0 .5rem;
`

const StyledTitle = styled.span`
    margin: 0;
    font-size: .85rem;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({theme}) => theme.colors.foreground};
`
const StyledCounter = styled.span`
    margin: 0;
    font-size: .75rem;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({theme}) => theme.colors.gray};
`

const StyledIcon = styled.span`
    width: 2.25rem;
    height: 2.25rem;
    ${C.styles.flex.flexRowCenter};
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
`

export default (props) => {
    const tag = props.index ? props[props.index] : props

    return <StyledTagContainer>
        <Link width='100%' to={`/t/${tag.title}`}>
            <StyledTagContent>
                <StyledIcon>
                    <Icon icon='Hash' color='foreground' />
                </StyledIcon>
                <StyledMain>
                    <StyledTitle>
                        #{tag.title}
                    </StyledTitle>
                    <StyledCounter>
                        {tag.counter} weeshes
                    </StyledCounter>
                </StyledMain>
            </StyledTagContent>
        </Link>
    </StyledTagContainer>
}

