import React, { createContext, useEffect, useState } from 'react';
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setRole(currentUser.role);
        }
      } catch (err) {
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const register = async (userData) => {
    const newUser = await registerUser(userData);
    return newUser;
  };

  const login = async (credentials, expectedRole) => {
    const loggedInUser = await loginUser(credentials, expectedRole);
    setUser(loggedInUser);
    setRole(loggedInUser.role);
    return loggedInUser;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};