import React from "react"
import styled from "styled-components"
import { AuthContext } from "Root/contexts/auth"
import { EditProfileContext } from "Root/contexts/editProfile"
import { UserContext } from "Root/contexts/user"
import api from "Root/api"
import Input from "Root/components/global/Input"
import C from "Root/constants"
import { useMutation, useLazyQuery } from "@apollo/react-hooks"

export default props => {
    const { auth, dispatch: authDispatch } = React.useContext(AuthContext)
    const { editProfile, dispatch: editProfileDispatch } = React.useContext(
        EditProfileContext,
    )
    const initState = {
        username: auth.username,
        errorMessage: null,
        errorMessageColor: null,
    }
    const [state, setState] = React.useState(initState)
    const [checkUsername, { data, error, called, loading }] = useLazyQuery(
        api.users.checkUsername,
        {
            fetchPolicy: "no-cache",
        },
    )

    const handleChange = ({ key, e }) => {
        if (e.target.value.match(/^(?=.{5,25}$)[a-zA-Z0-9._]+$/gim)) {
            if (auth.username !== e.target.value) {
                checkUsername({
                    variables: {
                        [key]: e.target.value,
                    },
                })
            } else {
                setErrorMessage({
                    errorMessage: null,
                    errorMessageColor: null,
                })
                editProfileDispatch({ type: "ENABLE_DONE_BUTTON" })
            }
        } else {
            setErrorMessage({
                errorMessage: C.txts.en.editProfile.usernameMessages.invalid,
                errorMessageColor: "red",
            })
            editProfileDispatch({ type: "DISABLE_DONE_BUTTON" })
        }

        let username = e.target.value
        setState(prevState => ({
            ...prevState,
            username,
        }))

        editProfileDispatch({
            type: "EDIT_PROFILE",
            data: {
                username: e.target.value,
            },
        })
    }

    React.useEffect(() => {
        if (error) {
            console.log(error)
        }

        if (called && data) {
            const result = data.checkUsernameForUser
            if (!result) {
                setErrorMessage({
                    errorMessage:
                        C.txts.en.editProfile.usernameMessages.available,
                    errorMessageColor: "green",
                })
                editProfileDispatch({ type: "ENABLE_DONE_BUTTON" })
            } else {
                setErrorMessage({
                    errorMessage:
                        C.txts.en.editProfile.usernameMessages.alreadyTaken,
                    errorMessageColor: "red",
                })
                editProfileDispatch({ type: "DISABLE_DONE_BUTTON" })
            }
        }

        if (loading) {
            setErrorMessage({
                errorMessage: C.txts.en.editProfile.usernameMessages.checking,
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
            label={state.errorMessage || "Username"}
            labelColor={state.errorMessageColor}
            padding=".65rem"
            value={editProfile.username}
            onChange={e => handleChange({ key: "username", e })}
            width={100}
            margin=".5rem 0 0"
            placeholder="Username"
        />
    )
}
