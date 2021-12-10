import React, { useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider, { AuthContext } from "./components/providers/AuthProvider";
import Routes from "./navigation/Routes";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes></Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}
