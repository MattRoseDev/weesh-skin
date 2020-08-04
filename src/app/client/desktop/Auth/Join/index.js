import React from 'react'
import styled from 'styled-components'
import { Components } from 'Root/StyledComponents'
import Logo from 'Root/components/global/Logo'
import GoogleAuth from 'Root/components/global/GoogleAuth'
import Input from 'Root/components/global/Input'
import Button from 'Root/components/global/Button'
import OR from 'Root/components/global/OR'
import C from 'Root/constants'
import { AuthContext } from 'Root/contexts/auth'
import { Link } from 'react-router-dom'
import useHistory from 'Root/hooks/useHistory'
import { useMutation } from '@apollo/react-hooks'
import api from 'Root/api'
import WelcomePicture from 'Root/public/img/login/welcome.png'
import Meta from 'Root/meta'
import helpers from 'Root/helpers'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumnCenter};
    height: 100vh;
    margin: 0 auto;
`

const StyledJoin = styled.form`
    ${C.styles.flex.flexColumnCenter};
    border: 1px solid ${({ theme }) => theme.colors.light};
    border-radius: 2rem;
    width: 25rem;
    padding: 3rem 0 2rem;
`

const StyledImg = styled.img`
    padding: 0 2rem;
`

const StyledBox = styled.div`
    ${C.styles.flex.flexRowCenter};
    border: none;
    overflow: hidden;
`

const StyledLoginLink = styled(Link)`
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.justifyContentCenter};
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    text-decoration: none;
    border-radius: 0.5rem;
    padding: 0.25rem 1rem;
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
        <StyledContainer>
            <Meta type='Join' />
            <StyledBox>
                <StyledImg height='400' src={WelcomePicture} />
                <StyledJoin onSubmit={e => handleSubmit(e)}>
                    <Logo fontSize={5} margin='1.5rem' />
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
                        radius='.5rem'
                        background='primary'
                        isLoading={isLoading || undefined}
                        fontWeight='bold'
                        width='75%'
                        margin='1.5rem 0 0'
                        radius='.75rem'
                        padding='.85rem'
                        fontSize='.85rem'>
                        {C.txts.en.auth.joinButton}
                    </Button>
                    <GoogleAuth
                        buttonText='Join with Google'
                        handleRequest={oAuthGoogleRequest}
                        data={{
                            invitationCode:
                                helpers.storage.get({
                                    key: 'invitationCode',
                                }) || '',
                        }}
                    />
                    <OR width={75} margin={1.5} />
                    <StyledLoginLink to='login'>
                        {C.txts.en.auth.loginLink}
                    </StyledLoginLink>
                </StyledJoin>
            </StyledBox>
        </StyledContainer>
    )
}
