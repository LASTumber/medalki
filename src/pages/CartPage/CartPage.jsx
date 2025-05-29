import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Modal from '../../components/Modal/Modal';
import './CartPage.css';

export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const [modalItem, setModalItem] = React.useState(null);

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
