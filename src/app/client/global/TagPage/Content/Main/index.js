import React from "react";
import styled from "styled-components";
import uuid from "uuid";
import Weesh from "Root/components/global/Weesh";
import helpers from "Root/helpers";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "Root/contexts/auth";
import { TagContext } from "Root/contexts/tag";
import api from "Root/api";
import Loader from "Root/components/global/Loader";
import C from "Root/constants";

const StyledMain = styled.div`
  padding: 0.5rem 0.5rem 3.125rem;
`;
const StyledLoader = styled.div`
  ${C.styles.flex.flexRowCenter};
  padding: 2rem 0;
`;

export default props => {
  const { tag } = React.useContext(TagContext);
  return (
    <StyledMain>
      {tag &&
        tag.weeshesTag &&
        tag.weeshesTag.map(item => (
          <Weesh
            {...item.weesh}
            key={uuid()}
            tagTitle={props.match.params.tagTitle}
          />
        ))}
    </StyledMain>
  );
};
