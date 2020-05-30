import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import List from 'Root/components/desktop/List'
import Loader from 'Root/components/global/Loader'
import SliderTab from 'Root/components/global/SliderTab'
import C from 'Root/constants'
import Input from 'Root/components/global/Input'
import Textarea from 'Root/components/global/Textarea'
import ErrorMessage from 'Root/components/global/ErrorMessage'
import { useMutation } from '@apollo/react-hooks'
import useHistory from 'Root/hooks/useHistory'
import api from 'Root/api'
import { AuthContext } from 'Root/contexts/auth'
import { SnackBarContext } from 'Root/contexts/snackbar'
import Button from 'Root/components/global/Button'
import { Helmet } from 'react-helmet'
import helpers from 'Root/helpers'

const StyledContainer = styled.div`
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
    subject: '',
    description: '',
}

export default (props) => {
    const { auth } = React.useContext(AuthContext)
    const { snackbar, dispatch: snackbarDispatch } = React.useContext(SnackBarContext)
    const [state, setState] = React.useState(initialVariables)
    const [addMessage, addMessageResponse] = useMutation(api.support.addMessage)
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
        if (state.description.length > 0) {
            addMessage({
                variables: {
                    subject: state.subject,
                    description: state.description,
                }
            })
        }
    }

    React.useEffect(() => {
        if(addMessageResponse.data) {
            console.log(addMessageResponse.data)
        }

        if(addMessageResponse.data) {
            history.goBack()
            snackbarDispatch({
                type: 'SET_DATA',
                data: {
                    icon: 'CheckCircle',
                    message: 'Your message sent to support.',
                    background: 'foreground',
                    visible: true
                }
            })
            setTimeout(() => {
                snackbarDispatch({ type: 'HIDE' })
            }, 2 * 1000)
        }
    }, [addMessageResponse])

    return <StyledContainer>
        <Helmet>
            <title>{helpers.titleTag({ type: 'Support' })}</title>
        </Helmet>
        {(addMessageResponse && addMessageResponse.error) && <ErrorMessage margin='.75rem 0 0' width='100%' message={addMessageResponse.error.graphQLErrors[0].message} />}
        <StyledForm onSubmit={e => handleSubmit(e)}>
            <Input label='Subject' padding='.65rem' value={state.subject} onChange={(e) => handleChange({ key: 'subject', e })} width={100} margin='1rem 0 0' />
            <Textarea label='Description' padding='.65rem' value={state.description} onChange={(e) => handleChange({ key: 'description', e })} width={100} rows='10' margin='1rem 0 0' />
            <StyledButtonContainer>
                {state.description.length > 0 ? <Button padding='.65rem 1.5rem' background='primary' color='white' radius='5rem' margin='.75rem 0 0' fontWeight='bold' isLoading={addMessageResponse.loading || undefined}>Submit</Button> : <Button cursor='not-allowed' padding='.65rem 1.5rem' background='lightGray' color='gray' radius='5rem' margin='.75rem 0 0' fontWeight='bold'>Submit</Button>}
            </StyledButtonContainer>
        </StyledForm>
    </StyledContainer>
}