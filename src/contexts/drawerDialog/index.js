import React from "react";
import { drawerDialogReducer } from "Root/reducers/drawerDialog";

export const DrawerDialogContext = React.createContext();

const initialDrawerDialog = {
  visible: false,
};

const DrawerDialogProvider = props => {
  const [drawerDialog, dispatch] = React.useReducer(
    drawerDialogReducer,
    initialDrawerDialog,
  );

  return (
    <DrawerDialogContext.Provider value={{ drawerDialog, dispatch }}>
      {props.children}
    </DrawerDialogContext.Provider>
  );
};

export default DrawerDialogProvider;
