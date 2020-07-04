import React from 'react'
import styled from 'styled-components'
import Logo from 'Root/components/global/Logo'
import Input from 'Root/components/global/Input'
import Button from 'Root/components/global/Button'
import ErrorMessage from 'Root/components/global/ErrorMessage'
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
    background: ${({theme}) => theme.colors.background};
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
        if (error) {
            console.log(error.graphQLErrors[0].message)
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
        handleJoin()
    }
    
    // auth.token && history.push('/')
    return <StyledLogin onSubmit={e => handleSubmit(e)}>
        <Meta type='Join' />
        <Logo fontSize={4}/>
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
        <Button color='background' background='primary' fontWeight='bold' isLoading={loading || undefined} width='75%' margin='.75rem 0 0' padding='.85rem' radius='.75rem' fontSize='.85rem' >{C.txts.en.auth.joinButton}</Button>
        <OR width={75} margin={1.5}/>
        <StyledJoinLink to='login'>{C.txts.en.auth.loginLink}</StyledJoinLink>
    </StyledLogin>
}
