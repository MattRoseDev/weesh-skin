import React from 'react'
import styled from 'styled-components'
import Logo from 'Root/components/global/Logo'
import Input from 'Root/components/global/Input'
import ErrorMessage from 'Root/components/global/ErrorMessage'
import Button from 'Root/components/global/Button'
import OR from 'Root/components/global/OR'
import C from 'Root/constants'
import { AuthContext } from 'Root/contexts/auth'
import { Link } from 'react-router-dom'
import useHistory from 'Root/hooks/useHistory'
import { useMutation } from '@apollo/react-hooks'
import api from 'Root/api'
import WelcomePicture from 'Root/public/img/login/2803208.png'
import { Helmet } from 'react-helmet'
import helpers from 'Root/helpers'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumnCenter};
    height: 100vh;
    margin: 0 auto;
`

const StyledJoin = styled.form`
    ${C.styles.flex.flexColumnCenter};
    border-left: 1px solid ${({ theme }) => theme.colors.light};
    width: 25rem;
`

const StyledImg = styled.img`
    padding: 5rem 2rem;
`

const StyledBox = styled.div`
    ${C.styles.flex.flexRowCenter};
    ${C.styles.boxShadow.primary.bold};
    overflow: hidden;
    border-radius: 2rem;
`

const StyledLoginLink = styled(Link)`
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.justifyContentCenter};
    color: ${({theme}) => theme.colors.blue};
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

export default () => {
    const { auth, dispatch } = React.useContext(AuthContext)
    const [variables, setVariables] = React.useState(initVariables)
    const history = useHistory()
    
    const [join, { data, error, loading }] = useMutation(api.auth.join)

    React.useEffect(() => {
        if(error) {
            console.log(error)
        }
        if (data) {
            const { token, user } = data.join
            dispatch({
                type: 'LOGIN',
                data: {
                    token,
                    ...user
                }
            })
            setTimeout(() => history.push('/'), 500)

        }
    }, [data, error])

    const handleJoin = () => join({ variables })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('hello')
        handleJoin()
    }
    
    auth.token && history.push('/')
    return <StyledContainer>
        <Helmet>
            <title>{helpers.titleTag({ type: 'Join' })}</title>
        </Helmet>
        <StyledBox>
            <StyledImg height='400' src={WelcomePicture} />
            <StyledJoin onSubmit={e => handleSubmit(e)}>
                <Logo fontSize={5} margin={1.5} />
                {error && <ErrorMessage width='75%' message={error.graphQLErrors[0].message} />}
                <Input margin='.5rem 0 0' onChange={(e) => {
                    let firstName = e.target.value
                    setVariables(prevState => ({
                        ...prevState,
                        firstName
                    }))
                }} width={75} icon='User' placeholder='Name' />
                <Input margin='.5rem 0 0' onChange={(e) => {
                    let email = e.target.value
                    setVariables(prevState => ({
                        ...prevState,
                        email
                    }))
                }} width={75} icon='Mail' placeholder='Email' />
                <Input margin='.5rem 0 0' onChange={(e) => {
                    let password = e.target.value
                    setVariables(prevState => ({
                        ...prevState,
                        password
                    }))
                }} width={75} icon='Lock' placeholder='Password' type='password' />
                <Button color='background' radius='.5rem' background='blue' isLoading={loading || undefined} fontWeight='bold' width='75%' margin='1.5rem 0 0' radius='.75rem' padding='.85rem' fontSize='.85rem'>{C.txts.en.auth.joinButton}</Button>
                <OR width={75} margin={1.5} />
                <StyledLoginLink to='login'>{C.txts.en.auth.loginLink}</StyledLoginLink>
            </StyledJoin>
        </StyledBox>
    </StyledContainer>
}
