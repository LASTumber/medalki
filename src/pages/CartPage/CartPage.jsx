import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import './CartPage.css';

export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) return null; // или return <Spinner />

  return (
    <div className="cart-container">
      <h1>Ваша корзина</h1>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className="cart-list">
          {cart.map(item => (
            <li key={item.id} className="cart-item">
              <img
                src={item.imageUrl}
                alt={item.title}
                onClick={() => setModalItem(item)}
              />
              <div className="cart-info">
                <h3 onClick={() => setModalItem(item)}>{item.title}</h3>
                <button onClick={() => removeFromCart(item.id)}>
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button className="cart-order-btn">ОФОРМИТЬ ЗАКАЗ</button>
      )}
      {modalItem && (
        <Modal
          isOpen={!!modalItem}
          onClose={() => setModalItem(null)}
          card={modalItem}
        />
      )}
    </div>
  );
}
