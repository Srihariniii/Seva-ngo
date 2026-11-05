import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('seva_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('seva_admin_token');
      const storedUser = localStorage.getItem('seva_admin_user');

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        if (storedUser) {
          setAdmin(JSON.parse(storedUser));
        }
        const res = await authApi.verify();
        if (res.data.success) {
          setAdmin(res.data.data);
          localStorage.setItem('seva_admin_user', JSON.stringify(res.data.data));
        }
      } catch (err) {
        console.warn('Session verification failed, logging out:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    if (res.data.success) {
      const { token: receivedToken, ...userData } = res.data.data;
      setToken(receivedToken);
      setAdmin(userData);
      localStorage.setItem('seva_admin_token', receivedToken);
      localStorage.setItem('seva_admin_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: res.data.message || 'Login failed' };
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('seva_admin_token');
    localStorage.removeItem('seva_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
