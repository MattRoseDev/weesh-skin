import React from 'react'
import styled from 'styled-components'
import Logo from 'Root/components/global/Logo'
import BackButton from 'Root/components/global/BackButton'
import Icon from 'Root/components/global/Icon'
import Header from 'Root/app/client/mobile/Template/Header'

const StyledTitle = styled.strong`
    text-transform: capitalize;
`   

export default (props) => {
    let url = props.match.url.split('/')
    const status = url[url.length - 1]

    return <Header>
        <BackButton />
        <StyledTitle>{status}</StyledTitle>
        <Icon size={24} color='background' icon='ChevronLeft' />
    </Header>
}