import React from "react";
import LoggedInUserContext from "./LoggedInUserContext";

const LoggedInUserContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = React.useState(false);
  return (
    <LoggedInUserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedInUserContextProvider;
