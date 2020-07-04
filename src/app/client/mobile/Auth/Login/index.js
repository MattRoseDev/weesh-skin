import React from 'react'
import styled from 'styled-components'
import Logo from 'Root/components/global/Logo'
import Input from 'Root/components/global/Input'
import Button from 'Root/components/global/Button'
import ErrorMessage from 'Root/components/global/ErrorMessage'
import OR from 'Root/components/global/OR'
import C from 'Root/constants'
import {AuthContext} from 'Root/contexts/auth'
import useHistory from 'Root/hooks/useHistory'
import {Link} from 'react-router-dom'
import {useLazyQuery} from '@apollo/react-hooks'
import api from 'Root/api'
import Meta from 'Root/meta'
import helpers from 'Root/helpers'

const StyledLogin = styled.form`
    ${C.styles.flex.flexColumnCenter};
    height: 100vh;
    background: ${({theme}) => theme.colors.background};
`

const StyledForgotPasswordLink = styled(Link)`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentEnd};
    color: ${({theme}) => theme.colors.primary};
    font-size: 0.85rem;
    margin: 0.75rem 0 1rem;
    width: 75%;
    text-decoration: none;
`

const StyledJoinLink = styled(Link)`
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.justifyContentCenter};
    /* border: 1px solid ${({theme}) => theme.colors.primary}; */
    color: ${({theme}) => theme.colors.primary};
    margin: 0;
    text-decoration: none;
    border-radius: .5rem;
    padding: .25rem .5rem;
`

const initVariables = {
    username: '',
    password: '',
}

export default () => {
    const {auth, dispatch} = React.useContext(AuthContext)
    const [variables, setVariables] = React.useState(initVariables)
    const history = useHistory()
    const [loadLogin, {data, called, loading, error}] = useLazyQuery(
        api.auth.login,
    )

    React.useEffect(() => {
        if (error) {
            console.log(error.graphQLErrors[0].message)
        }
        if (called && data) {
            const {token, user} = data.login
            console.log(data)
            dispatch({
                type: 'LOGIN',
                data: {
                    token,
                    ...user,
                },
            })
            setTimeout(() => history.push('/'), 100)
        }
    }, [data, error])

    const handleSubmit = e => {
        e.preventDefault()
        loadLogin({
            variables,
        })
    }
    // auth.token && history.push('/')
    return (
        <StyledLogin onSubmit={e => handleSubmit(e)}>
            <Meta type="Login" />
            <Logo fontSize={4} margin="1.5rem" />
            {error && (
                <ErrorMessage
                    width="75%"
                    message={error.graphQLErrors[0].message}
                />
            )}
            <Input
                margin=".5rem 0 0"
                onChange={e => {
                    let username = e.target.value
                    setVariables(prevState => ({
                        ...prevState,
                        username,
                    }))
                }}
                width={75}
                icon="AtSign"
                placeholder="Username or Email"
            />
            <Input
                margin=".5rem 0 0"
                onChange={e => {
                    let password = e.target.value
                    setVariables(prevState => ({
                        ...prevState,
                        password,
                    }))
                }}
                width={75}
                icon="Lock"
                placeholder="Password"
                type="password"
            />
            {/* <StyledForgotPasswordLink to='forgotpassword'>
            {C.txts.en.auth.forgotPasswordLink}
        </StyledForgotPasswordLink> */}
            <Button
                color="background"
                background="primary"
                fontWeight="bold"
                isLoading={loading || undefined}
                margin=".5rem 0 0"
                padding=".85rem"
                fontSize=".85rem"
                width="75%"
            >
                {C.txts.en.auth.loginButton}
            </Button>
            <OR width={75} margin={1.5} />
            <StyledJoinLink to="join">{C.txts.en.auth.joinLink}</StyledJoinLink>
        </StyledLogin>
    )
}
