import React from "react";
import styled, { css } from "styled-components";
import C from "Root/constants";
import Avatar from "Root/components/global/Avatar";
import Link from "Root/components/global/Link";

const StyledHeader = styled.div`
  ${({ isChild }) =>
    !isChild &&
    css`
      padding: 0.75rem 0 0 0.75rem;
    `};
  ${C.styles.flex.flexRow};
  ${C.styles.flex.justifyContentBetween};
`;

export default props => {
  return (
    <StyledHeader {...props}>
      <Link to={`/${props.user.username}`}>
        <Avatar size={1.75} user={props.user} />
      </Link>
    </StyledHeader>
  );
};
