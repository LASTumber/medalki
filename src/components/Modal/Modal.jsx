// src/components/Modal/Modal.jsx

import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { CartContext } from '../../pages/context/CartContext';
import { AuthContext } from '../../pages/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Modal({ isOpen, onClose, card }) {
  const [visible, setVisible] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Анимация открытия/закрытия
  useEffect(() => {
    if (isOpen) {
      // Ждём кадр, чтобы вставить класс .open
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // Пока закрыто и анимация закрытия не завершилась — null
  if (!isOpen && !visible) return null;

  const handleAddToCart = () => {
    onClose();
    if (!user) {
      // Гость — перенаправляем на логин
      navigate('/login');
    } else {
      addToCart(card);
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`modal-overlay${visible ? ' open' : ''}`}
      onClick={onClose}
    >
      <div
        className={`modal-content${visible ? ' open' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-photo">
          <img src={card.imageUrl} alt={card.title} />
        </div>
        <div className="modal-info">
          <h2 className="modal-title">{card.title}</h2>
          <p className="modal-desc">{card.description}</p>
          <button
            className="modal-order-btn"
            onClick={handleAddToCart}
          >
            В КОРЗИНУ
          </button>
        </div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
