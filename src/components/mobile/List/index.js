import React from 'react'
import styled from 'styled-components'
import UserItem from './UserItem'
import TagItem from 'Root/components/global/List/TagItem'
import helpers from 'Root/helpers'
import uuid from 'uuid'

const StyledContainer = styled.div`
    max-width: 100vw;
`

export default props => {
    return (
        <StyledContainer>
            {props.users.map(user =>
                user.title != undefined ? (
                    <TagItem key={uuid()} {...user} />
                ) : (
                    <UserItem
                        request={props.request || undefined}
                        index={props.index || undefined}
                        key={uuid()}
                        {...user}
                    />
                ),
            )}
        </StyledContainer>
    )
}
