import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import './CartPage.css';

export default function CartPage() {
  const { cart, removeFromCart /* , clearCart */ } = useContext(CartContext);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalItem, setModalItem] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  const handleOrder = async () => {
    if (cart.length === 0) {
      setOrderStatus('Ваша корзина пуста');
      return;
    }

    setIsOrdering(true);
    setOrderStatus('');

    const orderDetails = cart.map(item => `${item.title} (ID: ${item.id})`).join('\n');
    const cardIds = cart.map(item => item.id);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name || user.id || 'Пользователь',
          phone: user.phone || 'Не указан',
          email: user.email,
          comment: `Заказ:\n${orderDetails}`,
          cardIds
        }),
      });

      if (response.ok) {
        setOrderStatus('✅ Заказ оформлен! Проверьте вашу почту.');
        // clearCart(); // <- раскомментируй, если хочешь очищать корзину после заказа
      } else {
        const data = await response.json();
        setOrderStatus(`❌ Ошибка: ${data.error || 'Не удалось оформить заказ'}`);
      }
    } catch (error) {
      setOrderStatus(`❌ Ошибка: ${error.message}`);
    } finally {
      setIsOrdering(false);
    }
  };

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
                <button onClick={() => removeFromCart(item.id)}>Удалить</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <button
          className="cart-order-btn"
          onClick={handleOrder}
          disabled={isOrdering}
        >
          {isOrdering ? 'Оформляем заказ...' : 'ОФОРМИТЬ ЗАКАЗ'}
        </button>
      )}

      {orderStatus && <p className="order-status">{orderStatus}</p>}

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
