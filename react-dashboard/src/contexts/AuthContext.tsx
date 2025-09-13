import React, { createContext, useContext, useEffect, useState } from 'react';
import { authUtils } from '../service/authApi';
import { UserRes } from '../service/authApi';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserRes | null;
  token: string | null;
  loading: boolean;
  login: (user: UserRes, token: string) => void;
  logout: () => void;
  updateUser: (user: UserRes) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserRes | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on app load
    const checkAuth = () => {
      try {
        const storedToken = authUtils.getToken();
        const storedUser = authUtils.getUser();
        const isAuth = authUtils.isAuthenticated();

        if (isAuth && storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
          setIsAuthenticated(true);
        } else {
          // Clear invalid auth data
          authUtils.clearAuth();
          setIsAuthenticated(false);
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        authUtils.clearAuth();
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: UserRes, authToken: string) => {
    authUtils.setToken(authToken);
    authUtils.setUser(userData);
    setToken(authToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authUtils.clearAuth();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData: UserRes) => {
    authUtils.setUser(userData);
    setUser(userData);
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
