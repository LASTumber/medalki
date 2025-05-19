import React, { useState } from 'react';
import './CTASection.css';

const CTASection = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    comment: '',
  });
  const [status, setStatus] = useState(null);

  // Универсальный обработчик полей
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setStatus('sending');
    try {
      const res = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Сделайте заказ!</h2>
        <p className="cta-subtitle">
          Оставьте заявку и наш менеджер свяжется с вами
        </p>
        <div className="cta-form">
          <div className="cta-form-left">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Ваше имя"
              className="cta-input"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Телефон"
              className="cta-input"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="E-mail"
              className="cta-input"
            />
          </div>
          <div className="cta-form-right">
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Комментарий"
              className="cta-textarea"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="cta-submit-button"
          disabled={status === 'sending'}
        >
          {status === 'sending'
            ? 'Отправка...'
            : status === 'sent'
            ? 'Отправлено!'
            : 'Отправить'}
        </button>
        {status === 'error' && (
          <p className="cta-error">Ошибка при отправке. Попробуйте снова.</p>
        )}
      </div>
    </section>
  );
};

export default CTASection;
