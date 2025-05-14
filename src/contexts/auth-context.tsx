"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const SESSION_EXPIRATION_IN_DAYS = 7;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userEmail = Cookies.get("user_email");

    if (userEmail) {
      setUser({ email: userEmail });
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string) => {
    Cookies.set("user_email", email, { expires: SESSION_EXPIRATION_IN_DAYS });

    setUser({ email });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("user_email");

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
