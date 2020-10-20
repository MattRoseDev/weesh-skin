import React from "react";
import Button from "./Button";
import styled from "styled-components";
import Icon from "Root/components/global/Icon";
import C from "Root/constants";
import { AuthContext } from "Root/contexts/auth";

const StyledContainer = styled.div`
  width: ${({ widthButtons }) => widthButtons || "100%"};
  ${C.styles.flex.flexRow};
  ${C.styles.flex.justifyContentBetween};
  position: fixed;
  bottom: 0;
  margin: 0 auto;
`;

export default props => {
  const { auth, dispatch: authDispatch } = React.useContext(AuthContext);

  return (
    <StyledContainer {...props}>
      <Button
        color="red"
        onClick={() =>
          props.setCropImage(prevState => ({
            ...prevState,
            visible: false,
          }))
        }
        margin=".5rem 0 .5rem .5rem">
        <Icon color="red" icon="X" />
        {C.txts.en.cropImage.discardButton}
      </Button>
      <Button
        color="primary"
        onClick={props.uploadFunc}
        margin=".5rem .5rem .5rem">
        <Icon color={`${auth.color}`} icon="ArrowUp" />
        {C.txts.en.cropImage.uploadButton}
      </Button>
    </StyledContainer>
  );
};
