import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useState } from "react";
import jwt_decode from "jwt-decode";

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
    const decoded = jwt_decode(userToken!) as { sub: string };
    setUser(decoded.sub);
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
