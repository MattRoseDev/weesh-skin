import React from "react";
import styled from "styled-components";
import { Components } from "Root/StyledComponents";
import C from "Root/constants";

const StyledFooter = styled.footer`
  ${C.styles.flex.flexRowCenter};
  width: 80rem;
`;

export default () => {
  return (
    <StyledFooter>
      <Components.Global.About />
    </StyledFooter>
  );
};
