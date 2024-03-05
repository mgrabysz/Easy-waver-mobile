import React from "react";

interface LoggedUserContextType {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void
}

const LoggedUserContext = React.createContext<LoggedUserContextType>({
  isLogged: false,
  setIsLogged: () => {}
})

export default LoggedUserContext;