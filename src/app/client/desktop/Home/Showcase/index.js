import React from 'react'
import styled from 'styled-components'
import Auth from 'Root/components/mobile/Auth'
import Logo from 'Root/components/global/Logo'
import Icon from 'Root/components/global/Icon'
import Loading from 'Root/components/global/Loading'
import uuid from 'uuid'
import WeeshForShowcase from 'Root/components/global/WeeshForShowcase'
import {useQuery} from '@apollo/react-hooks'
import {AuthContext} from 'Root/contexts/auth'
import api from 'Root/api'
import helpers from 'Root/helpers'
import C from 'Root/constants'
import Meta from 'Root/meta'

const StyledContainer = styled.div`
    background: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.foreground};
    ${C.styles.flex.flexColumnCenter};
    padding: 0 0.5rem 0.5rem;
`

const StyledHeader = styled.div`
    ${C.styles.flex.flexColumnCenter};
    height: 65vh;
`

const StyledQuote = styled.p`
    font-size: 2rem;
    color: ${({theme}) => theme.colors.foreground};
    font-weight: lighter;
    padding: 1rem 0 2rem;
`

const StyledShowcase = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentCenter};
    width: 38rem;
`

const StyledThemeButton = styled.header`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentEnd};
    ${C.styles.flex.alignItemsCenter};
    margin: 0 1rem;
    padding: 1rem 2rem;
`

const StyledIconContainer = styled.button`
    ${C.styles.flex.flexRowCenter};
    background: ${({theme}) => theme.colors.foreground};
    border: 1px solid ${({theme}) => theme.colors.foreground};
    padding: 0 0.5rem;
    border-radius: 50rem;
    height: 2rem;
    cursor: pointer;
`

const StyledIconTitle = styled.span`
    color: ${({theme}) => theme.colors.background};
    padding: 0.25rem;
    font-size: 0.85rem;
`

export default () => {
    const {auth, dispatch} = React.useContext(AuthContext)
    const [state, setState] = React.useState(null)
    const {data, called, error, loading} = useQuery(api.weeshes.getShowcase)

    const handleTheme = () => dispatch({type: 'TOGGLE_THEME'})

    React.useEffect(() => {
        if (error) {
            console.log(error)
        }

        if (called && data) {
            const result = data.getTheBestWeeshesForUser
            setState(result)
        }
    }, [data, error])

    const details = [
        {
            title: 'Wishes are written',
            description: 'Post what you wish for.',
        },
        {
            title: 'Others exprience',
            description: 'Hear others thoughts.',
        },
        {
            title: 'Safe and Secret',
            description: 'We protect your weeshes.',
        },
        {
            title: 'Give advice',
            description: 'Comment what you think about other wishes.',
        },
    ]

    return (
        <StyledContainer>
            <Meta type='Showcase' />
            <StyledThemeButton>
                <StyledIconContainer onClick={handleTheme}>
                    <Icon
                        size={20}
                        color='background'
                        icon={`${auth.theme == 'light' ? 'Moon' : 'Sun'}`}
                    />
                    <StyledIconTitle>
                        {auth.theme == 'light' ? 'Night' : 'Day'}
                    </StyledIconTitle>
                </StyledIconContainer>
            </StyledThemeButton>
            <StyledHeader>
                <Logo fontSize={5} />
                <StyledQuote>{C.txts.en.g.quote}</StyledQuote>
                <Auth />
            </StyledHeader>
            <StyledShowcase>
                {loading ? (
                    <Loading size={28} strokeWidth={1.25} color='gray' />
                ) : (
                    state &&
                    state.weeshes &&
                    state.weeshes.map((weesh, key) => (
                        <WeeshForShowcase
                            {...weesh}
                            key={uuid()}
                            lastItem={
                                key >=
                                data.getTheBestWeeshesForUser.weeshes.length - 1
                            }
                        />
                    ))
                )}
            </StyledShowcase>
        </StyledContainer>
    )
}
