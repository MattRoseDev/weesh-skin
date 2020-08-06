import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import Input from 'Root/components/global/Input'
import ErrorMessage from 'Root/components/global/ErrorMessage'
import { useMutation } from '@apollo/react-hooks'
import useHistory from 'Root/hooks/useHistory'
import api from 'Root/api'
import { AuthContext } from 'Root/contexts/auth'
import { SnackBarContext } from 'Root/contexts/snackbar'
import Button from 'Root/components/global/Button'
import Meta from 'Root/meta'

const StyledContainer = styled.div`
    min-height: ${window.innerHeight - 55}px;
    padding: 0 0.75rem;
`

const StyledForm = styled.form``

const StyledButtonContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentEnd};
`

const initialVariables = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
}

export default props => {
    const { auth, dispatch } = React.useContext(AuthContext)
    const { snackbar, dispatch: snackbarDispatch } = React.useContext(
        SnackBarContext,
    )
    const [state, setState] = React.useState(initialVariables)
    const [changePassword, changePasswordResponse] = useMutation(
        api.users.changePassword,
    )
    const history = useHistory()

    const handleChange = ({ key, e }) => {
        let value = e.target.value
        setState(prevState => {
            return {
                ...prevState,
                [key]: value,
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (
            state.newPassword.length > 0 &&
            state.newPassword == state.confirmPassword
        ) {
            changePassword({
                variables: {
                    oldPassword: state.oldPassword,
                    newPassword: state.newPassword,
                },
            })
        }
    }

    React.useEffect(() => {
        if (changePasswordResponse.data) {
            dispatch({
                type: 'LOGIN',
                data: {
                    password: true,
                },
            })
            history.goBack()
            snackbarDispatch({
                type: 'SET_DATA',
                data: {
                    icon: 'CheckCircle',
                    message: 'Your password changed successfully.',
                    background: 'foreground',
                    visible: true,
                },
            })
            setTimeout(() => {
                snackbarDispatch({ type: 'HIDE' })
            }, 2 * 1000)
        }
    }, [changePasswordResponse])

    let inputs = [
        {
            label: C.txts.en.editProfile.changePassword.oldPassword,
            value: state.oldPassword,
            onChange: e => handleChange({ key: 'oldPassword', e }),
        },
        {
            label: C.txts.en.editProfile.changePassword.newPassword,
            value: state.newPassword,
            onChange: e => handleChange({ key: 'newPassword', e }),
        },
        {
            label: C.txts.en.editProfile.changePassword.confirmPassword,
            value: state.confirmPassword,
            onChange: e => handleChange({ key: 'confirmPassword', e }),
        },
    ]

    if (!auth.password) [(inputs = inputs.splice(1))]

    return (
        <StyledContainer>
            <Meta type='EditProfile' />
            {changePasswordResponse && changePasswordResponse.error && (
                <ErrorMessage
                    margin='.75rem 0 0'
                    width='100%'
                    message={
                        changePasswordResponse.error.graphQLErrors[0].message
                    }
                />
            )}
            <StyledForm onSubmit={e => handleSubmit(e)}>
                {inputs.map(item => (
                    <Input
                        label={item.label}
                        type='password'
                        padding='.65rem'
                        value={item.value}
                        onChange={item.onChange}
                        width={100}
                        margin='1rem 0 0'
                    />
                ))}
                <StyledButtonContainer>
                    {state.newPassword.length > 0 &&
                    state.newPassword == state.confirmPassword ? (
                        <Button
                            padding='.65rem 1.5rem'
                            background='primary'
                            color='background'
                            radius='5rem'
                            margin='.75rem 0 0'
                            fontWeight='bold'
                            isLoading={
                                changePasswordResponse.loading || undefined
                            }>
                            {C.txts.en.editProfile.changePassword.submit}
                        </Button>
                    ) : (
                        <Button
                            cursor='not-allowed'
                            padding='.65rem 1.5rem'
                            background='lightGray'
                            color='gray'
                            radius='5rem'
                            margin='.75rem 0 0'
                            fontWeight='bold'>
                            {C.txts.en.editProfile.changePassword.submit}
                        </Button>
                    )}
                </StyledButtonContainer>
            </StyledForm>
        </StyledContainer>
    )
}
