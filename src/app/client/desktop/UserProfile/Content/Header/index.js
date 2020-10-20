import React from "react"
import styled from "styled-components"
import Cover from "Root/components/global/Cover"
import Avatar from "Root/components/global/Avatar"
import Content from "Root/app/client/global/UserProfile/Content/Header/Content"
import { UserContext } from "Root/contexts/user"

const StyledHeader = styled.div`
    position: relative;
`

const StyledAvatarFrame = styled.div`
    position: absolute;
    bottom: -4rem;
    padding: 1rem 0 0 1rem;
`
const StyledImagesFrame = styled.div`
    position: relative;
`

export default props => {
    const { user } = React.useContext(UserContext)

    return (
        <StyledHeader>
            <StyledImagesFrame>
                <Cover height="202px" user={user} />
                <StyledAvatarFrame>
                    <Avatar
                        user={user}
                        size={7}
                        bordercolor="background"
                        borderwidth={4}
                    />
                </StyledAvatarFrame>
            </StyledImagesFrame>
            <Content {...props} />
        </StyledHeader>
    )
}
