import React from "react";
import WeeshPageContainer from "./WeeshPageContainer";
import WeeshPageProvider from "Root/contexts/weeshPage";

export default props => {
  return (
    <WeeshPageProvider>
      <WeeshPageContainer {...props} />
    </WeeshPageProvider>
  );
};
