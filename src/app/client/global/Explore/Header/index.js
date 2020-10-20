import React from "react";
import styled from "styled-components";
import Input from "./Input";
import Header from "Root/app/client/mobile/Template/Header";

export default props => {
  return (
    <Header padding=".5rem .5rem 0" borderBottom={false}>
      <Input {...props} />
    </Header>
  );
};
