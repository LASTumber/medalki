import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // Загружаем корзину из localStorage после авторизации
  useEffect(() => {
  if (loading) return;

  if (!user || !user.id) {
    setCart([]);
    return;
  }

  try {
    const saved = localStorage.getItem(`cart_${user.id}`);
    setCart(saved ? JSON.parse(saved) : []);
  } catch (e) {
    console.error('Ошибка при чтении корзины из localStorage:', e);
    setCart([]);
  }
}, [user, loading]);

useEffect(() => {
  if (loading || !user?.id) return;

  try {
    localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
  } catch (e) {
    console.error('Ошибка при сохранении корзины в localStorage:', e);
  }
}, [cart, user, loading]);


  const addToCart = (item) => {
    setCart(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
