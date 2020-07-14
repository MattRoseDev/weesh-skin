import React from 'react'
import { GoogleLogin } from 'react-google-login'
import styled from 'styled-components'
import config from 'Root/config'

const StyeldButton = styled(GoogleLogin)`
    width: 75%;
    border-radius: 0.75rem !important;
    margin: 0.75rem 0 0;
    overflow: hidden;
    display: flex !important;
    & > span {
        flex-grow: 1;
        padding: 10px 30px 10px 0 !important;
    }
    & > div {
        padding: 10px 0 10px 10px !important;
        margin: 0 !important;
    }
`

export default props => {
    const responseGoogle = response => {
        props.handleRequest({
            variables: {
                gToken: `${response.tokenId}`,
            },
        })
    }
    return (
        <StyeldButton
            clientId={config.google.CLIENT_ID}
            buttonText={props.buttonText}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}
