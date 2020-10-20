import React from "react"
import styled from "styled-components"
import C from "Root/constants"
import { AuthContext } from "Root/contexts/auth"
import Avatar from "Root/components/global/Avatar"
import FullName from "Root/components/global/FullName"
import MoreButton from "./MoreButton"
import StyledComponents, { Components } from "Root/StyledComponents"
import Link from "Root/components/global/Link"

const StyledHeader = styled.div`
    padding: 0.75rem 0.75rem 0;
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
`

export default props => {
    const userWidth =
        window.innerWidth < 960
            ? `${Math.floor(window.innerWidth - 175) / 2}px`
            : undefined

    return (
        <StyledHeader>
            {props.child && props.child.user ? (
                <StyledComponents.Weesh.Header.LeftSide>
                    {props.user && (
                        <Components.Global.User
                            fontSize=".9rem"
                            fontWeight="bold"
                            margin="0"
                            user={props.user}
                            size={1.75}
                            width={userWidth}
                        />
                    )}
                    <StyledComponents.Weesh.Header.ReWeeshedUser>
                        <Components.Global.Icon
                            icon="Repeat"
                            color="foreground"
                            size={18}
                        />
                        <Components.Global.User
                            fontSize=".9rem"
                            fontWeight="bold"
                            margin="0 0 0 .5rem"
                            user={props.child.user}
                            size={1.75}
                            width={userWidth}
                        />
                    </StyledComponents.Weesh.Header.ReWeeshedUser>
                </StyledComponents.Weesh.Header.LeftSide>
            ) : (
                props.user && (
                    <StyledComponents.Weesh.Header.LeftSide>
                        <Components.Global.Avatar
                            to={`/${props.user.username}`}
                            {...props}
                        />
                        {props.user && (
                            <StyledComponents.Weesh.Header.NameContainer>
                                <Link to={`/${props.user.username}`}>
                                    <Components.Global.FullName
                                        {...props}
                                        fontSize={0.85}
                                        labelSize="16"
                                    />
                                </Link>
                                <Link to={`/${props.user.username}`}>
                                    <StyledComponents.Weesh.Header.Username>
                                        @{props.user.username}
                                    </StyledComponents.Weesh.Header.Username>
                                </Link>
                            </StyledComponents.Weesh.Header.NameContainer>
                        )}
                    </StyledComponents.Weesh.Header.LeftSide>
                )
            )}
            <MoreButton {...props} />
        </StyledHeader>
    )
}
