import React, { FC, useState } from "react";

export const AuthContext = React.createContext<{
  user: string;
  handleLogin: (user: string) => void;
}>({
  user: "",
  handleLogin: () => {},
});

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState("");

  const login = (user: string) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin: login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
