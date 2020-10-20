import React from "react"
import styled from "styled-components"
import C from "Root/constants"
import StyledComponents, { Components } from "Root/StyledComponents"
import { AuthContext } from "Root/contexts/auth"
import moment from "moment"
import helpers from "Root/helpers"

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    padding: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
    width: 100%;
`

const StyledIcon = styled(Components.Global.Icon)`
    background: linear-gradient(to right top, #0ba7dd, #68e9ff);
    -webkit-background-clip: text !important;
    background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    font-family: Autumn_in_November;
    font-weight: bolder;
    overflow: hidden;
`

const StyledContent = styled.div`
    ${C.styles.flex.flexColumn};
    width: 100%;
`

const StyledReason = styled.p`
    width: 100%;
    font-size: 0.85rem;
    padding: 0.25rem;
    color: ${({ theme }) => theme.colors.dark};
`

const StyledTransfer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
`
const StyledCredits = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentStart};
`

const StyledUsername = styled.strong`
    padding: 0 0 0 0.25rem;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.dark};
`

export default props => {
    const { auth } = React.useContext(AuthContext)
    let amount = props.amount == 0 ? 1 : props.amount
    amount = props.sender.id == auth.id ? -amount : amount
    const user = props.sender.id == auth.id ? props.recipient : props.sender
    return (
        <StyledContainer>
            {/* <StyledIcon strokeWidth={2.5} size={40}
                icon={Math.sign(amount) == -1 ? 'ArrowDown' : 'ArrowUp'}
                color={Math.sign(amount) == -1 ? 'gray' : 'blue'} /> */}
            <StyledContent>
                <StyledTransfer>
                    <StyledIcon
                        strokeWidth={3}
                        size={20}
                        icon={Math.sign(amount) == -1 ? "ArrowDown" : "ArrowUp"}
                        color={Math.sign(amount) == -1 ? "gray" : "blue"}
                    />
                    <Components.Global.User
                        margin="0 .25rem"
                        fontSize=".75rem"
                        user={user}
                    />
                    <StyledComponents.Title
                        fontSize=".75rem"
                        color="gray">{` ${helpers.dateFormat(
                        moment(props.createdAt).fromNow(true),
                    )}`}</StyledComponents.Title>
                </StyledTransfer>
                <StyledReason>{props.reason}</StyledReason>
            </StyledContent>
            <StyledCredits>
                <Components.Global.Diamond
                    width={25}
                    value={amount}
                    fontSize="1.5rem"
                    paddingValue=".5rem .25rem 0 0"
                    margin="0 0 0 .5rem"
                />
            </StyledCredits>
        </StyledContainer>
    )
}
