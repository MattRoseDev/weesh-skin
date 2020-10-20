import React from "react"
import styled from "styled-components"
import C from "Root/constants"
import { Components } from "Root/StyledComponents"
import { useQuery } from "react-apollo"
import helpers from "Root/helpers"
import api from "Root/api"

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    padding: 0 1rem;
    width: 75%;
`

const StyledTitle = styled.small`
    font-size: 0.75rem;
    padding: 0 0.25rem 0 0;
    color: ${({ theme }) => theme.colors.gray};
`

const StyledUsername = styled.strong`
    padding: 0 0 0 0.25rem;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.dark};
`

const StyledContent = styled.span`
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsCenter};
`

export default () => {
    const invitationCode = helpers.storage.get({ key: "invitationCode" })
    const [state, setState] = React.useState(null)
    const { data, error, loading } = useQuery(
        api.invitations.getUserByInvitationCodeForUser,
        {
            variables: {
                invitationCode: invitationCode || "",
            },
        },
    )

    React.useEffect(() => {
        if (data) {
            const response = data.getUserByInvitationCodeForUser
            setState(response)
        }
    }, [data])

    return (
        <>
            {state && (
                <StyledContainer>
                    <StyledTitle>Invited By</StyledTitle>
                    {state && (
                        <>
                            <Components.Global.Avatar user={state} size={1} />
                            <StyledUsername>{state.username}</StyledUsername>
                        </>
                    )}
                </StyledContainer>
            )}
        </>
    )
}
