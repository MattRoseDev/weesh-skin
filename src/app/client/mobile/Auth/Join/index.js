import React from 'react'
import styled from 'styled-components'
import Logo from 'Root/components/global/Logo'
import Input from 'Root/components/global/Input'
import Button from 'Root/components/global/Button'
import OR from 'Root/components/global/OR'
import CONSTANTS from 'Root/constants'
import { AuthContext } from 'Root/contexts/auth'
import useHistory from 'Root/hooks/useHistory'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import api from 'Root/api'

const StyledLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: ${CONSTANTS.themes.light.colors.white};
`

const StyledForgotPasswordLink = styled(Link)`
    display: flex;
    justify-content: flex-end;
    color: ${CONSTANTS.themes.light.colors.blue};
    font-weight: 300;
    margin: .75rem 0 1rem;
    width: 75%;
    text-decoration: none;
    font-size: .85rem;
`

const StyledJoinLink = styled(Link)`
    display: inline-flex;
    justify-content: center;
    border: 1px solid ${CONSTANTS.themes.light.colors.blue};
    color: ${CONSTANTS.themes.light.colors.blue};
    font-weight: 300;
    margin: 0;
    text-decoration: none;
    border-radius: .5rem;
    padding: .25rem .5rem;
`

const initVariables = {
    email: '',
    firstName: '',
    password: '',
}

const Element = () => {
    const { auth, dispatch } = React.useContext(AuthContext)
    const [variables, setVariables] = React.useState(initVariables)
    const history = useHistory()
    
    const [join, { data, error }] = useMutation(api.auth.join)

    React.useEffect(() => {
        if(error) {
            console.log(error)
        }
        if (data) {
            const { token, user } = data.join
            dispatch({
                type: 'LOGIN',
                token,
                username: user.username
            })
            history.push('/explore')
        }
    }, [data])

    const handleJoin = () => join({ variables })
    
    // auth.token && history.push('/')
    return <StyledLogin>
        <Logo fontSize={2.5}/>
        <Input onChange={(e) => {
            let firstName = e.target.value
            setVariables(prevState => ({
                ...prevState,
                firstName
            }))
        }} width={75} icon='User' placeholder='Name' />
        <Input onChange={(e) => {
            let email = e.target.value
            setVariables(prevState => ({
                ...prevState,
                email
            }))
        }} width={75} icon='Mail' placeholder='Email' />
        <Input onChange={(e) => {
            let password = e.target.value
            setVariables(prevState => ({
                ...prevState,
                password
            }))
        }} width={75} icon='Lock' placeholder='Password' type='password' />
        <Button width={75} margin={'.75rem 0 0'} padding={'.75rem'} onClick={handleJoin}>{CONSTANTS.txts.en.auth.joinButton}</Button>
        <OR width={75} margin={1.5}/>
        <StyledJoinLink to='login'>{CONSTANTS.txts.en.auth.loginLink}</StyledJoinLink>
    </StyledLogin>
}

export default Element