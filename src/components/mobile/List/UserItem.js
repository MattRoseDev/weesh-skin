import React from 'react'
import styled from 'styled-components'
import Avatar from 'Root/components/global/Avatar'
import ConnectionButton from 'Root/components/global/ConnectionButton'
import FullName from 'Root/components/global/FullName'
import C from 'Root/constants'
import Link from 'Root/components/global/Link'
import Button from 'Root/components/global/Button'
import Icon from 'Root/components/global/Icon'
import { useMutation } from '@apollo/react-hooks'
import api from 'Root/api'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyStart};
    ${C.styles.flex.alignItemsStretch};
    padding: 0.75rem 0.5rem 0;
`

const StyledRequestContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
    ${C.styles.flex.alignItemsStretch};
    padding: 0.75rem 0.5rem;
    border-bottom: ${({ borderBottom }) => borderBottom || '0px'} dashed
        ${({ theme }) => theme.colors.light};
`

const StyledRequestContent = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    padding: 0 0.25rem;
`

const StyledMain = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentCenter};
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 0 0 0.5rem;
    width: 50vw;
`

const StyledUsername = styled.span`
    margin: 0;
    font-size: 0.85rem;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.gray};
`

const StyledButton = styled.span`
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsCenter};
    font-size: 0.85rem;
    font-weight: normal;
    color: ${({ theme }) => theme.colors.dark};
`

const StyledIcon = styled.span`
    padding: 0 0.25rem 0 0.75rem;
    cursor: pointer;
`

export default props => {
    const user = props.index ? props[props.index] : props
    const requestContainer = React.useRef()

    const [accept, acceptResponse] = useMutation(api.connections.accept, {
        variables: {
            userId: `${user.id}`,
        },
    })

    const [reject, rejectResponse] = useMutation(api.connections.reject, {
        variables: {
            userId: `${user.id}`,
        },
    })

    const handleAccept = () => accept()

    const handleReject = () => reject()

    React.useEffect(() => {
        if (acceptResponse.data) {
            requestContainer.current.remove()
        }
        if (rejectResponse.data) {
            requestContainer.current.remove()
        }
    }, [acceptResponse, rejectResponse])

    return props.request ? (
        <StyledRequestContainer borderBottom='1px' ref={requestContainer}>
            <Link to={`/${user.username}`}>
                <StyledRequestContent>
                    <Avatar size={2.25} user={user} />
                    <StyledMain>
                        <FullName user={user} fontSize='0.85rem' />
                        <StyledUsername>@{user.username}</StyledUsername>
                    </StyledMain>
                </StyledRequestContent>
            </Link>
            <StyledButton>
                <Button
                    isLoading={acceptResponse.loading || undefined}
                    fontWeight='bold'
                    clickEvent={handleAccept}
                    background='primary'
                    color='background'
                    radius='50rem'
                    padding='.25rem .5rem'>
                    Confirm
                </Button>
                <StyledIcon onClick={handleReject}>
                    <Icon icon='X' />
                </StyledIcon>
            </StyledButton>
        </StyledRequestContainer>
    ) : (
        <StyledRequestContainer
            borderBottom={`${props.connection ? '1px' : undefined}`}>
            <Link width='100%' to={`/${user.username}`}>
                <StyledRequestContent>
                    <Avatar size={2.25} user={user} />
                    <StyledMain>
                        <FullName user={user} fontSize='0.85rem' />
                        <StyledUsername>@{user.username}</StyledUsername>
                    </StyledMain>
                </StyledRequestContent>
            </Link>
            {props.connection && (
                <StyledButton>
                    <ConnectionButton {...props} user={user} />
                </StyledButton>
            )}
        </StyledRequestContainer>
    )
}
