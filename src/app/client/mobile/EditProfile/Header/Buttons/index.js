import React from 'react'
import styled from 'styled-components'
import Logo from 'Root/components/global/Logo'
import Icon from 'Root/components/global/Icon'
import Avatar from 'Root/components/global/Avatar'
import Button from 'Root/components/global/Button'
import Navbar from 'Root/components/mobile/Navbar'
import { AuthContext } from 'Root/contexts/auth'
import { UserContext } from 'Root/contexts/user'
import { EditProfileContext } from 'Root/contexts/editProfile'
import avatar from 'Root/public/img/avatar.jpg'
import C from 'Root/constants'
import useHistory from 'Root/hooks/useHistory'
import api from 'Root/api'
import { useMutation } from '@apollo/react-hooks'

const StyledHeader = styled.header`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
    ${C.styles.flex.alignItemsCenter};
    background: ${({ theme }) => theme.colors.background};
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
    padding: 0 0.75rem;
    height: 44px;
    position: sticky;
    top: 0;
    z-index: 10;
`

const StyledTitle = styled.span`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.foreground};
`

const StyledLink = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    padding: 0.75rem 0;
`

export default () => {
    const { auth, dispatch: authDispatch } = React.useContext(AuthContext)
    const { editProfile } = React.useContext(EditProfileContext)
    const [editUser, { data, error, loading }] = useMutation(api.users.edit)
    const history = useHistory()

    const handleEditUser = () => {
        let variables = {}

        if (editProfile.unknown.fullname != auth.unknown.fullname) {
            variables['unknown'] = editProfile.unknown.fullname
        }
        if (editProfile.private != auth.private) {
            variables['private'] = editProfile.private
            authDispatch({
                type: 'LOGIN',
                data: {
                    private: editProfile.private,
                },
            })
        }
        const indexes = ['firstName', 'lastName', 'bio']
        for (let index of indexes) {
            if (editProfile[index] !== auth[index]) {
                variables[index] = editProfile[index]
            }
        }
        if (editProfile.username != auth.username) {
            variables['username'] = editProfile.username
        }
        if (editProfile.email != auth.email) {
            variables['email'] = editProfile.email
        }
        if (editProfile.color != auth.color) {
            variables['color'] = auth.color
        }
        if (editProfile.theme != auth.theme) {
            variables['theme'] = auth.theme
        }

        Object.values(variables).length
            ? editUser({ variables })
            : history.replace(`/${auth.username}`)
    }

    const handleCancel = () => {
        if (editProfile.color != auth.color) {
            authDispatch({ type: 'EDIT_COLOR', data: editProfile.color })
        }
        if (editProfile.theme != auth.theme) {
            authDispatch({ type: 'EDIT_THEME', data: editProfile.theme })
        }
        history.replace(`/${auth.username}`)
    }

    React.useEffect(() => {
        if (error) {
            console.log(error)
        }
        if (data) {
            const result = data.editUserForUser
            authDispatch({
                type: 'LOGIN',
                data: {
                    ...result.user,
                    token: result.token || auth.token,
                },
            })
            history.replace(`/${result.user.username}`)
        }
    }, [data])

    return (
        <>
            {auth.id != undefined && editProfile ? (
                <StyledHeader>
                    <Button
                        color='primary'
                        padding='1rem .5rem'
                        fontWeight='bold'
                        fontSize='1rem'
                        clickEvent={handleCancel}>
                        {C.txts.en.editProfile.header.cancelButton}
                    </Button>
                    <StyledTitle>
                        {C.txts.en.editProfile.header.title}
                    </StyledTitle>
                    {editProfile && editProfile.doneButton ? (
                        <Button
                            clickEvent={handleEditUser}
                            color='primary'
                            padding='1rem .5rem'
                            fontWeight='bold'
                            fontSize='1rem'>
                            {C.txts.en.editProfile.header.doneButton}
                        </Button>
                    ) : (
                        <Button
                            disabled
                            color='gray'
                            padding='1rem .5rem'
                            fontWeight='bold'
                            fontSize='1rem'>
                            {C.txts.en.editProfile.header.doneButton}
                        </Button>
                    )}
                </StyledHeader>
            ) : (
                <></>
            )}
        </>
    )
}
