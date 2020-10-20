import React from "react";
import { alertReducer } from "Root/reducers/alert";

export const AlertContext = React.createContext();

const initialAlert = {
  message: "",
  icon: "",
  background: "foreground",
  color: "background",
  visible: false,
};

const AlertProvider = props => {
  const [alert, dispatch] = React.useReducer(alertReducer, initialAlert);

  return (
    <AlertContext.Provider value={{ alert, dispatch }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
