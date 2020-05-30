import React from 'react'
import styled from 'styled-components'
import Tag from 'Root/components/global/Tag'
import uuid from 'uuid'
import C from 'Root/constants'
import moment from 'moment'
import helpers from 'Root/helpers'
import { Link } from 'react-router-dom'
import Convertors from 'Root/components/global/Convertors'

const StyledMain = styled.div`
    margin: 0 1rem;
`

const StyledText = styled.p`
    padding: .75rem 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: pre-wrap;
`

const StyledDateContainer = styled.div`
    color: ${({ theme }) => theme.colors.gray};
    font-size: .75rem;
`

const StyledTag = styled(Link)`
    color: ${({ theme }) => theme.colors.primary};
    ${C.styles.flex.inlineFlexRow};
    text-decoration: none;
`


export default (props) => {
    const [content, setContent] = React.useState(null)

    React.useEffect(() => {
        if (!content) {
            setContent(Convertors.Weesh({
                content: props.content
            }))
        }
    })

    return <StyledMain>
        <StyledText>
            {content}
        </StyledText>

        {props.updatedAt && <StyledDateContainer>
            {helpers.dateFormat(moment(props.updatedAt).format('hh:mm  A · MMM DD, YYYY'))}
        </StyledDateContainer>}
        {/* <StyledTagContainer>
            {props.tags.map(tag => <Tag key={uuid()}>{tag}</Tag>)}
        </StyledTagContainer> */}
    </StyledMain>
}
