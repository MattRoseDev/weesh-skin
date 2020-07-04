import React from 'react'
import styled from 'styled-components'
import Logo from 'Root/components/global/Logo'
import Input from 'Root/components/global/Input'
import Icon from 'Root/components/global/Icon'
import ErrorMessage from 'Root/components/global/ErrorMessage'
import Button from 'Root/components/global/Button'
import OR from 'Root/components/global/OR'
import C from 'Root/constants'
import {AuthContext} from 'Root/contexts/auth'
import useHistory from 'Root/hooks/useHistory'
import {Link} from 'react-router-dom'
import {useLazyQuery} from '@apollo/react-hooks'
import api from 'Root/api'
import WelcomePicture from 'Root/public/img/login/2803208.png'
import Meta from 'Root/meta'
import helpers from 'Root/helpers'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumnCenter};
    height: 100vh;
    margin: 0 auto;
`

const StyledBox = styled.div`
    ${C.styles.flex.flexRowCenter};
    ${C.styles.boxShadow.primary.bold};
    overflow: hidden;
    border-radius: 2rem;
`

const StyledIcon = styled.div`
    ${C.styles.flex.flexColumnCenter};
    border: 3px solid ${({theme}) => theme.colors.dark};
    min-width: 8rem;
    max-width: 8rem;
    min-height: 8rem;
    max-height: 8rem;
    border-radius: 50%;
    margin: 0 0 2rem;
`

const StyledImg = styled.img`
    padding: 5rem 2rem;
`

const StyledLogin = styled.form`
    ${C.styles.flex.flexColumnCenter};
    border-left: 1px solid ${({theme}) => theme.colors.light};
    width: 25rem;
    /* padding: 3rem 0 2rem; */
`

const StyledForgotPasswordLinkContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentEnd};
    margin: 0.75rem 0 1rem;
    width: 75%;
`

const StyledForgotPasswordLink = styled(Link)`
    ${C.styles.flex.inlineFlexRow};
    color: ${({theme}) => theme.colors.primary};
    font-size: 0.85rem;
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
    padding: .25rem 1rem;
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
        if (called && data) {
            const {token, user} = data.login
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

    auth.token && history.push('/')
    return (
        <StyledContainer>
            <Meta type="login" />
            <StyledBox>
                <StyledImg height="400" src={WelcomePicture} />
                <StyledLogin onSubmit={e => handleSubmit(e)}>
                    <Logo fontSize={4.5} margin="1.5rem" />
                    {/* <StyledIcon>
                    <Icon icon='User' color='dark' size={100} strokeWidth={1} />
                </StyledIcon> */}
                    {error && (
                        <ErrorMessage
                            width="75%"
                            message={error.graphQLErrors[0].message}
                        />
                    )}
                    <Input
                        margin=".75rem 0 0"
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
                        margin=".75rem 0 0"
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
                    <StyledForgotPasswordLinkContainer>
                        {/* <StyledForgotPasswordLink to='forgotpassword'>
                        {C.txts.en.auth.forgotPasswordLink}
                    </StyledForgotPasswordLink> */}
                    </StyledForgotPasswordLinkContainer>
                    <Button
                        color="background"
                        background="primary"
                        fontWeight="bold"
                        isLoading={loading || undefined}
                        margin=".5rem 0 0"
                        radius=".75rem"
                        padding=".85rem"
                        fontSize=".85rem"
                        width="75%"
                    >
                        {C.txts.en.auth.loginButton}
                    </Button>
                    <OR width={75} margin={1.5} />
                    <StyledJoinLink to="join">
                        {C.txts.en.auth.joinLink}
                    </StyledJoinLink>
                </StyledLogin>
            </StyledBox>
        </StyledContainer>
    )
}
