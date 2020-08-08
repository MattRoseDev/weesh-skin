import React from 'react'
import styled from 'styled-components'
import { Components } from 'Root/StyledComponents'
import Logo from 'Root/components/global/Logo'
import Input from 'Root/components/global/Input'
import GoogleAuth from 'Root/components/global/GoogleAuth'
import Button from 'Root/components/global/Button'
import OR from 'Root/components/global/OR'
import C from 'Root/constants'
import { AuthContext } from 'Root/contexts/auth'
import { Link } from 'react-router-dom'
import useHistory from 'Root/hooks/useHistory'
import { useMutation } from '@apollo/react-hooks'
import api from 'Root/api'
import Meta from 'Root/meta'
import helpers from 'Root/helpers'

const StyledLogin = styled.form`
    ${C.styles.flex.flexColumnCenter};
    height: 100vh;
    background: ${({ theme }) => theme.colors.background};
`

const StyledJoinLink = styled(Link)`
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.justifyContentCenter};
    /* border: 1px solid ${({ theme }) => theme.colors.primary}; */
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    text-decoration: none;
    border-radius: .5rem;
    padding: .25rem 1rem;
`

const initVariables = {
    email: '',
    firstName: '',
    password: '',
}

export default props => {
    const { auth, dispatch } = React.useContext(AuthContext)
    const [variables, setVariables] = React.useState(initVariables)
    const history = useHistory()
    const [isLoading, setIsLoading] = React.useState(false)
    const [join, { data, error, loading }] = useMutation(api.auth.join)
    const [oAuthGoogleRequest, oAuthGoogleResponse] = useMutation(
        api.auth.oAuthGoogle,
    )

    helpers.saveQueryString({
        location: props.location,
        param: 'invitationCode',
    })

    React.useEffect(() => {
        if (data) {
            const { token, user } = data.join
            dispatch({
                type: 'LOGIN',
                data: {
                    token,
                    ...user,
                },
            })
            helpers.storage.remove({ key: 'invitationCode' })
            setTimeout(() => history.push('/explore'), 500)
        }
    }, [data, error])

    React.useEffect(() => {
        setIsLoading(loading)
    }, [loading])

    React.useEffect(() => {
        if (oAuthGoogleResponse.data) {
            const { token, user } = oAuthGoogleResponse.data.oAuthGoogle
            dispatch({
                type: 'LOGIN',
                data: {
                    token,
                    ...user,
                },
            })
            setTimeout(() => history.push('/explore'), 500)
        }
    }, [oAuthGoogleResponse.data, oAuthGoogleResponse.error])

    React.useEffect(() => {
        setIsLoading(oAuthGoogleResponse.loading)
    }, [oAuthGoogleResponse.loading])

    const handleJoin = () =>
        join({
            variables: {
                ...variables,
                invitationCode:
                    helpers.storage.get({ key: 'invitationCode' }) || '',
            },
        })

    const handleSubmit = e => {
        e.preventDefault()
        handleJoin()
    }

    auth.token && history.push('/')
    return (
        <StyledLogin onSubmit={e => handleSubmit(e)}>
            <Meta type='Join' />
            <Logo fontSize={4} />
            <Components.Global.InvitedBy />
            {error && (
                <Components.Global.ErrorMessage
                    width='75%'
                    message={error.graphQLErrors[0].message}
                    margin='.5rem 0 0'
                />
            )}
            <Input
                margin='.5rem 0 0'
                onChange={e => {
                    let firstName = e.target.value
                    setVariables(prevState => ({
                        ...prevState,
                        firstName,
                    }))
                }}
                width={75}
                icon='User'
                placeholder='Name'
            />
            <Input
                margin='.5rem 0 0'
                onChange={e => {
                    let email = e.target.value
                    setVariables(prevState => ({
                        ...prevState,
                        email,
                    }))
                }}
                width={75}
                icon='Mail'
                placeholder='Email'
            />
            <Input
                margin='.5rem 0 0'
                onChange={e => {
                    let password = e.target.value
                    setVariables(prevState => ({
                        ...prevState,
                        password,
                    }))
                }}
                width={75}
                icon='Lock'
                placeholder='Password'
                type='password'
            />
            <Button
                color='background'
                background='primary'
                fontWeight='bold'
                isLoading={isLoading || undefined}
                width='75%'
                margin='1rem 0 0'
                padding='.85rem'
                radius='.75rem'
                fontSize='.85rem'>
                {C.txts.en.auth.joinButton}
            </Button>
            <GoogleAuth
                buttonText='Join with Google'
                handleRequest={oAuthGoogleRequest}
                data={{
                    invitationCode:
                        helpers.storage.get({ key: 'invitationCode' }) || '',
                }}
            />
            <OR width={75} margin={1.5} />
            <StyledJoinLink to='login'>
                {C.txts.en.auth.loginLink}
            </StyledJoinLink>
        </StyledLogin>
    )
}
