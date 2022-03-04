import React, { createContext, useState } from 'react';

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  return <UserContext.Provider value={{ account, setAccount }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
