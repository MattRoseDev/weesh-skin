import React from 'react'
import styled from 'styled-components'
import Cover from 'Root/components/global/Cover'
import Avatar from 'Root/components/global/Avatar'
import Content from './Content'
import { UserContext } from 'Root/contexts/user'

const StyledHeader = styled.div`
    position: relative;
`

const StyledAvatarFrame = styled.div`
    position: absolute;
    bottom: -3rem;
    padding: 1rem 0 0 1rem;
`
const StyledImagesFrame = styled.div`
    position: relative;
`

export default (props) => {
    const { user } = React.useContext(UserContext)

    return <StyledHeader>
        <StyledImagesFrame>
            <Cover height={`${window.innerWidth / 3}px`} user={user} />
            <StyledAvatarFrame>
                <Avatar user={user} size={4} bordercolor='background' borderwidth={2} />
            </StyledAvatarFrame>
        </StyledImagesFrame>
        <Content {...props} />
    </StyledHeader>
}