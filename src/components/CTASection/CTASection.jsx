import React from 'react';
import './CTASection.css';

const CTASection = () => (
  <section className="cta-section">
    <div className="cta-content">
      <h2>Сделайте заказ!</h2>
      <p className="cta-subtitle">Оставьте заявку и наш менеджер свяжется с вами</p>
      <div className="cta-form">
        <div className="cta-form-left">
          <input type="text" placeholder="Ваше имя" className="cta-input" />
          <input type="tel" placeholder="Телефон" className="cta-input" />
          <input type="email" placeholder="E-mail" className="cta-input" />
        </div>
        <div className="cta-form-right">
          <textarea placeholder="Комментарий" className="cta-textarea" />
        </div>
      </div>
      <button className="cta-submit-button">Отправить</button>
    </div>
  </section>
);

export default CTASection;
