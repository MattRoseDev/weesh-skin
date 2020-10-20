import React from "react";
import styled from "styled-components";
import Logo from "Root/components/global/Logo";
import BackButton from "Root/components/global/BackButton";
import Icon from "Root/components/global/Icon";
import Header from "Root/app/client/mobile/Template/Header";
import C from "Root/constants";

const StyledHeader = styled.div`
  position: relative;
  ${C.styles.flex.flexRowCenter};
  width: 100%;
`;

const StyledTag = styled.div`
  color: ${({ theme }) => theme.colors.foreground};
  width: 95%;
  font-weight: bold;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
`;

export default props => {
  return (
    <Header>
      <BackButton />
      <StyledHeader>
        <StyledTag>#{props.match.params.tagTitle}</StyledTag>
      </StyledHeader>
      <Icon size={24} color="background" icon="ChevronLeft" />
    </Header>
  );
};
