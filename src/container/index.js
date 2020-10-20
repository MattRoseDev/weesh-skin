import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "Root/app";

const Container = () => {
  return (
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  );
};

export default Container;
