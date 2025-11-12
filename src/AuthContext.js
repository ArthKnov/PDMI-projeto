import React from "react";
import { loadUser } from "./storage/storage";

const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  checkAuth: async () => {},
});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const checkAuth = React.useCallback(async () => {
    try {
      const user = await loadUser();
      console.log("Auth check - User:", user);
      setIsLoggedIn(user.isLoggedIn || false);
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}

