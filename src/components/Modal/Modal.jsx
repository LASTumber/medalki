import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export default function Modal({ isOpen, onClose, card, onOrder }) {
  const [visible, setVisible] = useState(false);

  // Анимация открытия/закрытия
  useEffect(() => {
    if (isOpen) {
      // Ждём кадр, чтобы вставить класс .open и запустить открытие
      requestAnimationFrame(() => setVisible(true));
    } else {
      // Снимаем класс .open, чтобы запустить закрытие
      setVisible(false);
    }
  }, [isOpen]);

  // Не монтируем в DOM, пока не открыт и не завершилась анимация закрытия
  if (!isOpen && !visible) return null;

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
            onClick={() => {
              // Сначала закрываем карточный модал,
              // затем вызываем onOrder для открытия CTA
              onClose();
              onOrder();
            }}
          >
            ЗАКАЗАТЬ ПОХОЖУЮ
          </button>
        </div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
