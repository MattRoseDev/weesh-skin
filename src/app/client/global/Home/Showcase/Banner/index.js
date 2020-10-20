import React from "react";
import styled from "styled-components";

const StyledBanner = styled.p`
  font-size: 3.5rem;
  width: 60rem;
  margin: 12rem 0rem;
  font-weight: 300;
  text-align: center;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Logo = styled.span`
  font-family: Autumn_in_November;
  font-size: 3rem;
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
