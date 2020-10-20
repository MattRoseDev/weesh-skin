import React from "react";
import styled from "styled-components";
import uuid from "uuid";
import C from "Root/constants";
import config from "Root/config";

const StyledContainer = styled.div`
  ${C.styles.flex.flexRow};
  ${C.styles.flex.center};
`;

const StyledTitle = styled.div`
  text-align: center;
  padding: 1.25rem 0.5rem 0.75rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: bold;
`;

export default props => {
  return (
    <StyledContainer>
      <StyledTitle>VERSION {config.VERSION}</StyledTitle>
      <StyledTitle>© 2020 WEESH</StyledTitle>
    </StyledContainer>
  );
};
