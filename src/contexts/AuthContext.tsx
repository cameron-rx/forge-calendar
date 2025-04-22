import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";


type AuthContextType = {
    auth: boolean
    isLoading: boolean
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
    logout: () => void;
};
  

interface props {
    children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: props) {
    const [auth, setAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:5243/auth/me", {
            credentials: "include"
        }).then( (res) => {
            res.ok ? res.json() : null
        }).then((data: any) => {
            setAuth(data.isLoggedIn)
            setIsLoading(false)
        }).catch(() => {
            setAuth(false)
            setIsLoading(false)
        })

    })

    const logout = () => {
        fetch("http://localhost:5243/logout", {
            method: 'POST',
            credentials: 'include',
          }).then(() => {
            setAuth(false)
            navigate("/login")
          })
    }
    
    return (
        <AuthContext.Provider value={{ auth, setAuth, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};