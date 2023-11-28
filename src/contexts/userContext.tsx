import { createContext, useState } from 'react';

const AuthenticationContext = createContext({});

const AuthenticationProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default login status

  const value = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthenticationContext.Provider
    value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationProvider };