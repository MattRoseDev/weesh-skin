import React from "react";
import styled from "styled-components";
import C from "Root/constants";
import StyledComponents, { Components } from "Root/StyledComponents";

const StyledContainer = styled.div`
  ${C.styles.flex.flexColumn};
  ${C.styles.flex.alignItemsCenter};
  margin: 1rem 1rem 0;
`;

export default props => {
  return (
    <StyledContainer>
      <StyledComponents.Title fontSize=".75rem" color="gray">
        {C.txts.en.credit.currentCredit}
      </StyledComponents.Title>
      <Components.Global.Diamond
        width={60}
        value={props.value}
        sign={false}
        fontSize="4rem"
        paddingValue="1.25rem .25rem 0 0"
        margin="-.5rem 0 0"
      />
    </StyledContainer>
  );
};
