import React from 'react'
import styled from 'styled-components'
import Cover from 'Root/components/global/Cover'
import Avatar from 'Root/components/global/Avatar'
import EditableImage from 'Root/components/global/EditableImage'
import Icon from 'Root/components/global/Icon'
import CropImage from 'Root/components/global/CropImage'
import {UserContext} from 'Root/contexts/user'
import {EditProfileContext} from 'Root/contexts/editProfile'

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

const initialCropImage = {
    visible: false,
    type: null,
}

export default props => {
    const {editProfile} = React.useContext(EditProfileContext)
    const [cropImage, setCropImage] = React.useState(initialCropImage)

    return (
        editProfile && (
            <StyledHeader>
                <CropImage
                    widthButtons="18rem"
                    setCropImage={setCropImage}
                    {...cropImage}
                />
                <StyledImagesFrame>
                    <EditableImage
                        onClick={() =>
                            setCropImage(prevState => ({
                                ...prevState,
                                visible: true,
                                type: 'coverAddress',
                                width: 1040,
                                height: 346,
                            }))
                        }
                    >
                        <Cover height="213px" user={editProfile} />
                    </EditableImage>
                    <StyledAvatarFrame>
                        <EditableImage
                            radius="50%"
                            onClick={() =>
                                setCropImage(prevState => ({
                                    ...prevState,
                                    visible: true,
                                    type: 'avatarAddress',
                                    width: 640,
                                    height: 640,
                                }))
                            }
                        >
                            <Avatar
                                user={editProfile}
                                size={7}
                                bordercolor="background"
                                borderwidth={4}
                            />
                        </EditableImage>
                    </StyledAvatarFrame>
                </StyledImagesFrame>
            </StyledHeader>
        )
    )
}
