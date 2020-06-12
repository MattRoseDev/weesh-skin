import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import List from 'Root/components/desktop/List'
import Loader from 'Root/components/global/Loader'
import SliderTab from 'Root/components/global/SliderTab'
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
import helpers from 'Root/helpers'

const StyledContainer = styled.div`
    min-height: ${window.innerHeight - 55}px;
    padding: 0 .75rem;
`

const StyledForm = styled.form``

const StyledButtonContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentEnd};
`

const StyledLoaderContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentCenter};
    padding: 1rem;
`

const initialVariables = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
}

export default (props) => {
    const { auth } = React.useContext(AuthContext)
    const { snackbar, dispatch: snackbarDispatch } = React.useContext(SnackBarContext)
    const [state, setState] = React.useState(initialVariables)
    const [changePassword, changePasswordResponse] = useMutation(api.users.changePassword)
    const history = useHistory()

    const handleChange = ({key, e}) => {
        let value = e.target.value
        setState(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (state.newPassword.length > 0 && state.newPassword == state.confirmPassword) {
            changePassword({
                variables: {
                    oldPassword: state.oldPassword,
                    newPassword: state.newPassword,
                }
            })
        }
    }

    React.useEffect(() => {
        if(changePasswordResponse.data) {
            history.goBack()
            snackbarDispatch({
                type: 'SET_DATA',
                data: {
                    icon: 'CheckCircle',
                    message: 'Your password changed successfully.',
                    background: 'foreground',
                    visible: true
                }
            })
            setTimeout(() => {
                snackbarDispatch({ type: 'HIDE' })
            }, 2 * 1000)
        }
    }, [changePasswordResponse])

    return <StyledContainer>
        <Meta type='EditProfile' />
        {(changePasswordResponse && changePasswordResponse.error) && <ErrorMessage margin='.75rem 0 0' width='100%' message={changePasswordResponse.error.graphQLErrors[0].message} />}
        <StyledForm onSubmit={e => handleSubmit(e)}>
            <Input label={'Old Password'} type='password' padding='.65rem' value={state.oldPassword} onChange={(e) => handleChange({ key: 'oldPassword', e })} width={100} margin='1rem 0 0' />
            <Input label={'New Password'} type='password' padding='.65rem' value={state.newPassword} onChange={(e) => handleChange({ key: 'newPassword', e })} width={100} margin='1rem 0 0' />
            <Input label={'Confirm Password'} type='password' padding='.65rem' value={state.confirmPassword} onChange={(e) => handleChange({ key: 'confirmPassword', e })} width={100} margin='1rem 0 0' />
            <StyledButtonContainer>
                {state.newPassword.length > 0 && state.newPassword == state.confirmPassword ? <Button padding='.65rem 1.5rem' background='primary' color='white' radius='5rem' margin='.75rem 0 0' fontWeight='bold' isLoading={changePasswordResponse.loading || undefined}>Submit</Button> : <Button cursor='not-allowed' padding='.65rem 1.5rem' background='lightGray' color='gray' radius='5rem' margin='.75rem 0 0' fontWeight='bold'>Submit</Button>}
            </StyledButtonContainer>
        </StyledForm>
    </StyledContainer>
}