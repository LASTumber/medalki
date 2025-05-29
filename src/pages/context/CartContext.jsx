// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // Загружаем корзину при изменении user
  useEffect(() => {
    if (!user) {
      // Если нет пользователя — очищаем корзину
      setCart([]);
      return;
    }
    // Пользователь есть — грузим его корзину
    const saved = localStorage.getItem(`cart_${user.id}`);
    setCart(saved ? JSON.parse(saved) : []);
  }, [user]);

  // Сохраняем корзину при её изменении
  useEffect(() => {
    if (!user) return; // если нет пользователя — не сохраняем
    localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
  }, [cart, user]);

  const addToCart = item => {
    setCart(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = id => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
