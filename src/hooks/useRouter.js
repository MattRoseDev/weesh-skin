import React from "react";
import { __RouterContext } from "react-router-dom";

const useRouter = () => {
  return React.useContext(__RouterContext);
};

export default useRouter;
