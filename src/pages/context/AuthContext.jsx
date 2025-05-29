import React, { createContext, useState, useEffect } from 'react';
import api from '../../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // При загрузке приложения пытаемся получить профиль пользователя по токену
  useEffect(() => {
    if (token) {
      api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        // Токен невалиден или сервер недоступен — очищаем
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      });
    }
  }, [token]);

  // Функция входа — сохраняет токен и данные пользователя
  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
  };

  // Функция выхода — очищает всё
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
