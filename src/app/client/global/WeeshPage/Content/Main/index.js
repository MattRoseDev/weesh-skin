import React from "react";
import styled from "styled-components";
import Tag from "Root/components/global/Tag";
import uuid from "uuid";
import C from "Root/constants";
import moment from "moment";
import helpers from "Root/helpers";
import { Link } from "react-router-dom";
import Convertors from "Root/components/global/Convertors";
import Child from "./Child";

const StyledMain = styled.div`
  margin: 0 1rem;
`;

const StyledText = styled.p`
  padding: 0.75rem 0;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 1.125rem;
  line-height: 1.5rem;
  user-select: text !important;
  color: ${({ theme }) => theme.colors.foreground};
`;

const StyledDateContainer = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.75rem;
`;

export default props => {
  const [content, setContent] = React.useState(null);

  React.useEffect(() => {
    if (!content) {
      props.content &&
        setContent(
          Convertors.Weesh({
            content: props.content,
          }),
        );
    }
  });

  return (
    <StyledMain>
      {props.content && (
        <>
          <StyledText>{content}</StyledText>
        </>
      )}
      <>{props.child && <Child {...props} />}</>
      {props.updatedAt && (
        <StyledDateContainer>
          {helpers.dateFormat(
            moment(props.createdAt).format("hh:mm  A · MMM DD, YYYY"),
          )}
          {`${props.updatedAt == props.createdAt ? "" : " · edited"}`}
        </StyledDateContainer>
      )}
    </StyledMain>
  );
};
