import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './CTAModal.css';

export default function CTAModal({ isOpen, onClose, children }) {
  const [show, setShow]       = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 1) Монтируем
      setShow(true);
      // 2) В следующем тике включаем видимость
      requestAnimationFrame(() => setVisible(true));
    } else if (show) {
      // 3) Снимаем класс open → запускаем CSS-close
      setVisible(false);
      // 4) Через 300 ms размонтируем
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, show]);

  if (!show) return null;

  return ReactDOM.createPortal(
    <div className={`cta-modal-overlay${visible ? ' open' : ''}`} onClick={onClose}>
      <div className={`cta-modal-content${visible ? ' open' : ''}`} onClick={e => e.stopPropagation()}>
        {children}
        <button className="cta-modal-close" onClick={onClose}>×</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
