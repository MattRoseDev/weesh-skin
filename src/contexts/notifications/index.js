import React from "react";
import { notificationsReducer } from "Root/reducers/notifications";

export const NotificationsContext = React.createContext();

const initialNotifications = {
  store: {},
  isEmpty: false,
};

const NotificationsProvider = props => {
  const [notifications, dispatch] = React.useReducer(
    notificationsReducer,
    initialNotifications,
  );

  return (
    <NotificationsContext.Provider value={{ notifications, dispatch }}>
      {props.children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
