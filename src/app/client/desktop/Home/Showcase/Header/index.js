import React from "react";
import styled from "styled-components";
import Logo from "Root/components/global/Logo";
import Icon from "Root/components/global/Icon";
import C from "Root/constants";
import { Components } from "Root/StyledComponents";

const StyledHeader = styled.header`
  ${C.styles.flex.flexRow};
  ${C.styles.flex.justifyContentBetween};
  ${C.styles.flex.alignItemsCenter};
  width: 80rem;
`;

const StyledAuth = styled.header`
  ${C.styles.flex.flexRow};
`;

const StyledLogo = styled.div`
  ${C.styles.flex.flexRow};
  ${C.styles.flex.alignItemsCenter};
`;

const StyledLogoDescription = styled.div`
  ${C.styles.flex.flexRow};
  ${C.styles.flex.alignItemsCenter};
  border-left: 2px solid ${({ theme }) => theme.colors.primary};
  margin: 0 0 0 1rem;
  padding: 0.5rem 0 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const StyledIconContainer = styled.button`
  ${C.styles.flex.flexRowCenter};
  background: ${({ theme }) => theme.colors.background};
  border: none;
  padding: 0 0.5rem;
  border-radius: 50rem;
  height: 2rem;
  cursor: pointer;
`;

export default props => {
  const handleTheme = () => props.dispatch({ type: "TOGGLE_THEME" });

  return (
    <StyledHeader>
      <StyledLogo>
        <Logo fontSize={2} margin=".75rem 0 0" />
        <StyledLogoDescription>Dreams Social Network</StyledLogoDescription>
      </StyledLogo>
      <StyledAuth>
        <Components.Global.Button
          color="primary"
          background="background"
          borderwidth="1px"
          fontWeight="bold"
          padding=".5rem 1rem"
          margin="0 .5rem 0 0"
          to="/login">
          Login
        </Components.Global.Button>
        <Components.Global.Button
          color="background"
          bordercolor="primary"
          background="primary"
          borderwidth="1px"
          fontWeight="bold"
          padding=".5rem 1.3rem"
          radius=".6rem"
          margin="0 .5rem 0 0"
          to="/login">
          Join
        </Components.Global.Button>
        <StyledIconContainer onClick={handleTheme}>
          <Icon
            size={22}
            color={`${props.auth.color}`}
            icon={`${props.auth.theme == "light" ? "Sun" : "Moon"}`}
          />
        </StyledIconContainer>
      </StyledAuth>
    </StyledHeader>
  );
};
