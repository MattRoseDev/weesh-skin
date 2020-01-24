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
import { useLazyQuery } from '@apollo/react-hooks'
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
    username: '',
    password: ''
}

const Element = () => {
    const { auth, dispatch } = React.useContext(AuthContext)
    const [variables, setVariables] = React.useState(initVariables)
    const history = useHistory()
    const [loadLogin, { data, called }] = useLazyQuery(api.auth.login, {
        variables,
    })

    React.useEffect(() => {
        if(called && data) {
            const { token, user } = data.login
            dispatch({ 
                type: 'LOGIN',
                token,
                username: user.username 
            })
            history.push('/explore')
        }
    },[data])
    
    // auth.token && history.push('/')
    return <StyledLogin>
        <Logo fontSize={4} margin={1.5} />
        <Input onChange={(e) => {
            let username = e.target.value
            setVariables(prevState => ({
                ...prevState,
                username
            }))
        }} width={75} icon='AtSign' placeholder='Username or Email'/>
        <Input onChange={(e) => {
            let password = e.target.value
            setVariables(prevState => ({
                ...prevState,
                password
            }))
        }} width={75} icon='Lock' placeholder='Password' type='password'/>
        <StyledForgotPasswordLink to='forgotpassword'>
            {CONSTANTS.txts.en.auth.forgotPasswordLink}
        </StyledForgotPasswordLink>
        <Button disabled={false} margin={'.5rem 0 0'} padding={'.75rem'} onClick={loadLogin} width={75}>{CONSTANTS.txts.en.auth.loginButton}</Button>
        <OR width={75} margin={1.5}/>
        <StyledJoinLink to='join'>{CONSTANTS.txts.en.auth.joinLink}</StyledJoinLink>
    </StyledLogin>
}

export default Element