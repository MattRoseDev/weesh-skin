import React from "react";
import styled from "styled-components";
import C from "Root/constants";

const StyledContainer = styled.section`
  ${C.styles.flex.flexColumn};
  ${C.styles.flex.alignItemsCenter};
  width: ${({ width }) => width || "100%"};
  margin: 1rem 0 0;
`;

const StyledTitle = styled.span`
  border-radius: 50rem;
  background-color: ${({ theme }) => theme.colors.foreground};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.5rem 1rem;
  margin: 2rem;
  font-weight: bold;
`;

export default ({ children, title, width }) => {
  return (
    <StyledContainer width={width || undefined}>
      <StyledTitle>{title}</StyledTitle>
      {children}
    </StyledContainer>
  );
};
