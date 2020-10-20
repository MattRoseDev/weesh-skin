import React from "react";
import styled, { css } from "styled-components";
import C from "Root/constants";

const StyledButton = styled.button`
  ${C.styles.flex.flexRowCenter};
  border-radius: 50rem;
  border: 1px solid ${({ theme, color }) => theme.colors[color || "dark"]};
  background: transparent;
  color: ${({ theme, color }) => theme.colors[color || "dark"]};
  padding: 0.75rem;
  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `};
  font-size: 1rem;
  width: 100%;
  cursor: pointer;
`;

export default props => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
