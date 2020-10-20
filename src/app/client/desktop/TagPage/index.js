import React from "react";
import TagContainer from "./TagContainer";
import TagProvider from "Root/contexts/tag";

export default props => {
  return (
    <TagProvider>
      <TagContainer {...props} />
    </TagProvider>
  );
};
