import { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const setTokenValue = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <TokenContext.Provider value={{ token, setTokenValue, removeToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
