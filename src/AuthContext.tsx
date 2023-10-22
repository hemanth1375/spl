import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the type for your context data
type AuthContextType = {
  accessToken: string | null;
  login: (token: string, expiresIn: number) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  storedToken:string | null;
  storedExpireTime:string | null;
};
type AuthProviderProps = {
    children: React.ReactNode;
  };

// Create the context with an initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }:any) => {
  const storedToken=sessionStorage.getItem('accessToken')
  const storedExpireTime=sessionStorage.getItem('tokenExpiration')
  // const [accessToken, setAccessToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken') || null);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);

  const login = (token: string, expiresIn: number) => {
    setAccessToken(token);
    setTokenExpiration(Date.now() + expiresIn * 1000);
    const expirationTime = Date.now() + expiresIn * 1000;
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('tokenExpiration', expirationTime.toString())
  };

  const logout = () => {
    setAccessToken(null);
    setTokenExpiration(null);
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('tokenExpiration');
  };

  const isAuthenticated = () => {
    return accessToken !== null && tokenExpiration !== null && Date.now() < tokenExpiration;
  };
  useEffect(() => {
    const storedAccessToken = sessionStorage.getItem('accessToken');
    const storedTokenExpiration = sessionStorage.getItem('tokenExpiration');
    
    if (storedAccessToken && storedTokenExpiration) {
      const expirationTime = parseInt(storedTokenExpiration, 10);
      if (Date.now() >= expirationTime) {
        // Token has expired, clear session data
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('tokenExpiration');
      }
    }
  }, []);
  const contextValue: AuthContextType = {
    accessToken,
    login,
    logout,
    isAuthenticated,
    storedToken,
    storedExpireTime
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use the context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
