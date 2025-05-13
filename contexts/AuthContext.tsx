"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import Cookies from "js-cookie"

interface User {
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar se o usuário já está autenticado ao carregar a página
  useEffect(() => {
    const userEmail = Cookies.get("user_email")

    if (userEmail) {
      setUser({ email: userEmail })
      setIsAuthenticated(true)
    }
  }, [])

  const login = (email: string) => {
    // Em um ambiente real, você faria uma chamada à API para autenticar o usuário
    // e receberia um token JWT ou similar

    // Para este exemplo, apenas armazenamos o email em um cookie
    Cookies.set("user_email", email, { expires: 7 }) // Expira em 7 dias

    setUser({ email })
    setIsAuthenticated(true)
  }

  const logout = () => {
    // Remover o cookie
    Cookies.remove("user_email")

    setUser(null)
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }

  return context
}
