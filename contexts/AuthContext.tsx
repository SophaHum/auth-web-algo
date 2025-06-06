import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, Algorithm } from '../types';
import { authApi } from '../src/api/authApi';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for persisted user in sessionStorage instead of localStorage
    const checkAuth = async () => {
      setIsLoading(true);
      const storedUser = sessionStorage.getItem('authUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.login(email, password);
      if (response.success && response.data) {
        const loggedInUser: User = {
          id: response.data.user.id,
          email: response.data.user.email,
          username: response.data.user.username
        };
        setUser(loggedInUser);
        sessionStorage.setItem('authUser', JSON.stringify(loggedInUser));
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string, hashAlgorithm: Algorithm) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.register(username, email, password, hashAlgorithm);
      if (response.success) {
        // After successful registration, log the user in
        await login(email, password);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('authUser');
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
