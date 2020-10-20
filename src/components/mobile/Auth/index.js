import React from "react";
import styled from "styled-components";
import C from "Root/constants";
import Button from "./Button";

const Auth = styled.div`
  ${C.styles.flex.inlineFlexRow};
  ${C.styles.flex.alignItemsCenter};
  font-size: ${({ fontSize }) => fontSize || 1.5}rem;
  padding: 1rem 0;
`;

const Element = props => {
  return (
    <Auth {...props}>
      <Button fill="true" to="/login">
        {C.txts.en.auth.loginButton}
      </Button>
      <Button to="/join">{C.txts.en.auth.joinButton}</Button>
    </Auth>
  );
};
export default Element;
