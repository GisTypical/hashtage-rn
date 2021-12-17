import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Dispatch, FC, useState } from "react";
import jwt_decode from "jwt-decode";
import { useQueryClient } from "react-query";

export const AuthContext = React.createContext<{
  user: string | null;
  following: number | null;
  setFollowing: Dispatch<React.SetStateAction<number | null>>;
  handleLogin: (user: string, following: number) => void;
  handleLogout: () => void;
}>({
  user: "",
  following: 0,
  setFollowing: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
});

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<string | null>("");
  const [following, setFollowing] = useState<number | null>(0);

  const handleLogin = async (userToken: string, following: number) => {
    const decoded = jwt_decode(userToken!) as { sub: string };
    setFollowing(following);
    setUser(decoded.sub);
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
    setFollowing(0);
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{ user, following, setFollowing, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
