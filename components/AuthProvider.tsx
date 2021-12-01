import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useState } from "react";

export const AuthContext = React.createContext<{
  user: string | null;
  handleLogin: (user: string) => void;
  handleLogout: () => void;
}>({
  user: "",
  handleLogin: () => {},
  handleLogout: () => {},
});

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>("");

  const handleLogin = async (userToken: string) => {
    setUser(userToken);
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
