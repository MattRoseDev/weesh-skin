import React from "react";
import styled, { css } from "styled-components";
import StyledComponents, { Components } from "Root/StyledComponents";
import C from "Root/constants";
import helpers from "Root/helpers";
import moment from "moment";
import { AuthContext } from "Root/contexts/auth";

const StyledContainer = styled.div`
  ${C.styles.flex.flexColumn};
  ${C.styles.flex.justifyContentCenter};
  padding: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.light};
`;

const StyledContent = styled.p`
  color: ${({ theme }) => theme.colors.foreground};
  padding: 0.5rem;
  font-size: 0.9rem;
  word-break: break-word;
`;

const StyledFooter = styled.div`
  ${C.styles.flex.flexRow};
  ${C.styles.flex.alignItemsCenter};
  padding: 0 0.5rem;
`;

const StyledBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 0.85rem;
  height: 0.85rem;
`;

export default props => {
  const { auth } = React.useContext(AuthContext);
  return (
    <StyledContainer>
      <Components.Global.User
        fontSize=".85rem"
        fontWeight="bold"
        user={props.sender}
        size={1.5}
      />
      <StyledContent>{props.message.replace(/\n/g, " ")}</StyledContent>
      <StyledFooter>
        <StyledComponents.Title
          color="gray"
          fontSize=".75rem"
          padding="0 .25rem 0 0">
          {helpers.dateFormat(
            moment(props.createdAt).format("hh:mm  A · MMM DD, YYYY"),
          )}
        </StyledComponents.Title>
        {props.sender.id == auth.id &&
          (props.read ? (
            <Components.Global.Icon icon="Eye" color="gray" size={14} />
          ) : (
            <Components.Global.Icon icon="Check" color="gray" size={16} />
          ))}
      </StyledFooter>
    </StyledContainer>
  );
};
