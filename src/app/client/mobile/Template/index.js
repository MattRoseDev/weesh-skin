import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import SnackBar from "Root/components/mobile/SnackBar";
import Alert from "Root/components/mobile/Alert";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
`;

export default props => {
  return (
    <StyledContainer>
      {/* <Header/> */}
      <Main>
        <Alert />
        <SnackBar />
        {props.children}
      </Main>
      {/* <Footer/> */}
    </StyledContainer>
  );
};
