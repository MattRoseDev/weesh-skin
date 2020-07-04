import React from 'react'
import styled, {css} from 'styled-components'
import {WeeshContext} from 'Root/contexts/weesh'
import {AuthContext} from 'Root/contexts/auth'
import SuggestionTag from 'Root/components/global/SuggestionTag'
import Main from 'Root/app/client/global/AddWeesh/Main'
import Footer from './Footer'
import SliderTab from 'Root/components/global/SliderTab'
import Loading from 'Root/components/global/Loading'
import uuid from 'uuid'
import C from 'Root/constants'
import Meta from 'Root/meta'
import helpers from 'Root/helpers'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumn};
    background: ${({theme}) => theme.colors.background};
    min-height: ${window.innerHeight - 55}px;
`

const StyledFrame = styled.div`
    width: 100%;
    ${C.styles.flex.flexColumn};
    padding: 0 0 1rem;
    border-bottom: 1px solid ${({theme}) => theme.colors.light};
    overflow: hidden;
`

const StyledSliderTabContent = styled.div`
    ${({p}) => {
        if (p) {
            if (window.innerWidth < 768) {
                return css`
                    flex-grow: 1;
                `
            } else {
                return css`
                    width: 30%;
                `
            }
        } else {
            if (window.innerWidth < 768) {
                return css`
                    flex-grow: 1;
                `
            } else {
                return css`
                    width: 50%;
                `
            }
        }
    }};
`

const StyledSliderTabContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    flex-wrap: wrap;
    padding: 0.75rem;
    border-bottom: 1px dashed ${({theme}) => theme.colors.light};
`

const StyledSliderTabTitle = styled.span`
    color: ${({theme}) => theme.colors.gray};
    padding: 0 0.75rem 0 0;
    font-size: 0.85rem;
`

export default props => {
    const {weesh, dispatch} = React.useContext(WeeshContext)
    const {auth} = React.useContext(AuthContext)
    const data = {
        tabs: [
            {
                id: uuid(),
                title: C.txts.en.addWeesh.everyone,
                icon: 'Globe',
                value: true,
                status: 3,
            },
            {
                id: uuid(),
                title: C.txts.en.addWeesh.friends,
                icon: 'Users',
                value: false,
                status: 2,
            },
            {
                id: uuid(),
                title: C.txts.en.addWeesh.onlyMe,
                icon: 'User',
                value: false,
                status: 1,
            },
        ],
    }

    auth.private && data.tabs.splice(0, 1)
    data.tabs[0].value = true

    React.useEffect(() => {
        if (auth.id) {
            dispatch({
                type: 'ADD_WEESH',
                data: {
                    status: data.tabs[0].status,
                },
            })
        }
    }, [auth])

    const handleStatus = ({status}) =>
        dispatch({
            type: 'ADD_WEESH',
            data: {
                status,
            },
        })

    return auth.username ? (
        <StyledContainer>
            <Meta type='AddWeesh' />
            <StyledFrame>
                <StyledSliderTabContainer>
                    <StyledSliderTabTitle>To:</StyledSliderTabTitle>
                    <StyledSliderTabContent p={auth.private}>
                        <SliderTab tabs={data.tabs} setStatus={handleStatus} />
                    </StyledSliderTabContent>
                </StyledSliderTabContainer>
                <SuggestionTag />
                <Main data={data} weesh={weesh} />
                <Footer data={data} />
            </StyledFrame>
        </StyledContainer>
    ) : (
        <Loading padding='3rem 0 0' size={28} strokeWidth={1.25} color='gray' />
    )
}
