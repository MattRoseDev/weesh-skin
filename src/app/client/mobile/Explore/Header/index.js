import React from "react";
import styled from "styled-components";
import Input from "Root/app/client/global/Explore/Header/Input";
import Header from "Root/app/client/mobile/Template/Header";

export default props => {
  return (
    <Header padding=".5rem .5rem 0" borderBottom={false}>
      <Input {...props} />
    </Header>
  );
};
