import React from "react";
import EditWeeshContainer from "./EditWeeshContainer";
import WeeshProvider from "Root/contexts/weesh";

export default props => {
  return (
    <WeeshProvider>
      <EditWeeshContainer {...props} />
    </WeeshProvider>
  );
};
