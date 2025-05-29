// src/pages/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]     = useState(null);
  const [token, setToken]   = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // При изменении токена — сохраняем в localStorage и ставим в axios
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // При старте приложения проверяем токен
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    // Заголовок уже установлен предыдущим useEffect’ом
    api.get('/auth/me')
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        // Если токен невалиден — сбрасываем
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    // не нужно вручную сохранять в localStorage или axios — это сделает первый useEffect
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
