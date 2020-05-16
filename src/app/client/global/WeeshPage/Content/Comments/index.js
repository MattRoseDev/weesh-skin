import React from 'react'
import styled from 'styled-components'
import Comment from 'Root/components/global/Comment'
import helpers from 'Root/helpers'
import uuid from 'uuid'
import { WeeshPageContext } from 'Root/contexts/weeshPage'


const StyledCommentsContainer = styled.div``

export default (props) => {
    const { weeshPage, dispatch: weeshPageDispatch } = React.useContext(WeeshPageContext)

    return <StyledCommentsContainer>
        {weeshPage.comment && 
            weeshPage.comment.weeshComments.map(comment => (<Comment key={uuid()} {...comment} />))}
    </StyledCommentsContainer>
}
