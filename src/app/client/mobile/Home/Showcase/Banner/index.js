import React from "react";
import styled from "styled-components";

const StyledBanner = styled.p`
  font-size: 2rem;
  width: 100%;
  margin: 5rem 0rem 0.3rem;
  font-weight: 300;
  line-height: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Logo = styled.span`
  font-family: Autumn_in_November;
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

export default () => {
  return (
    <StyledBanner>
      <Logo>Weesh</Logo> is a social network sepecially designed for wishes and
      dreams.
    </StyledBanner>
  );
};
