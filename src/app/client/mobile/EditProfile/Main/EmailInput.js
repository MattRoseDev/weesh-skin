import React from 'react'
import styled from 'styled-components'
import {AuthContext} from 'Root/contexts/auth'
import {EditProfileContext} from 'Root/contexts/editProfile'
import {UserContext} from 'Root/contexts/user'
import api from 'Root/api'
import Input from 'Root/components/global/Input'
import C from 'Root/constants'
import {useMutation, useLazyQuery} from '@apollo/react-hooks'
import validator from 'validator'
import asserts from 'assert'

export default props => {
    const {auth, dispatch: authDispatch} = React.useContext(AuthContext)
    const {editProfile, dispatch: editProfileDispatch} = React.useContext(
        EditProfileContext,
    )
    const initState = {
        email: auth.email,
        errorMessage: null,
        errorMessageColor: null,
    }
    const [state, setState] = React.useState(initState)
    const [checkEmail, {data, error, called, loading}] = useLazyQuery(
        api.users.checkEmail,
        {
            fetchPolicy: 'no-cache',
        },
    )
    const handleChange = ({key, e}) => {
        if (validator.isEmail(e.target.value)) {
            if (auth.email != e.target.value) {
                checkEmail({
                    variables: {
                        [key]: e.target.value,
                    },
                })
            } else {
                setErrorMessage({
                    errorMessage: null,
                    errorMessageColor: null,
                })
                editProfileDispatch({type: 'ENABLE_DONE_BUTTON'})
            }
        } else {
            setErrorMessage({
                errorMessage: C.txts.en.editProfile.emailMessages.lengthError,
                errorMessageColor: 'red',
            })
            editProfileDispatch({type: 'DISABLE_DONE_BUTTON'})
        }

        let email = e.target.value
        setState(prevState => ({
            ...prevState,
            email,
        }))

        editProfileDispatch({
            type: 'EDIT_PROFILE',
            data: {
                email: e.target.value,
            },
        })
    }

    React.useEffect(() => {
        if (error) {
            console.log(error)
        }

        if (called && data) {
            const result = data.checkEmailForUser

            if (!result) {
                setErrorMessage({
                    errorMessage: C.txts.en.editProfile.emailMessages.available,
                    errorMessageColor: 'green',
                })
                editProfileDispatch({type: 'ENABLE_DONE_BUTTON'})
            } else {
                setErrorMessage({
                    errorMessage:
                        C.txts.en.editProfile.emailMessages.alreadyTaken,
                    errorMessageColor: 'red',
                })
                editProfileDispatch({type: 'DISABLE_DONE_BUTTON'})
            }
        }

        if (loading) {
            setErrorMessage({
                errorMessage: C.txts.en.editProfile.emailMessages.checking,
                errorMessageColor: null,
            })
        }
    }, [data, error, loading])

    const setErrorMessage = state => {
        setState(prevState => ({
            ...prevState,
            ...state,
        }))
    }

    return (
        <Input
            label={state.errorMessage || 'Email'}
            labelColor={state.errorMessageColor}
            padding='.65rem'
            value={editProfile.email}
            onChange={e => handleChange({key: 'email', e})}
            width={100}
            margin='.5rem 0 0'
            placeholder='Email'
        />
    )
}
