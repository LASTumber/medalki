import React from 'react';
import './Footer.css';

const Footer = () => {
  // базовый путь к public (на случай деплоя в подпапке)
  const base = process.env.PUBLIC_URL || '';

  return (
    <footer className="footer">
      {/* Левая часть с логотипом */}
      <div className="footer-left">
        <img
          src={`${base}/images/logo.png`}
          alt="Logo"
          className="footer-logo"
        />
      </div>

      {/* Центр с текстовыми полями */}
      <div className="footer-center">
        <div className="footer-text">gold-kazan16@yandex.ru</div>
        <div className="footer-text">ул. Сары Садыковой 61</div>
        <div className="footer-text">Пн-Пт, 10:00 - 18:00</div>
      </div>

      {/* Правая часть с иконками и текстами */}
      <div className="footer-right">
        <div className="social-pair">
          <img
            src={`${base}/images/vk.png`}
            alt="VKontakte"
            className="social-icon"
          />
          <span>
            <a
              href="https://vk.com"
              target="_blank"
              rel="noreferrer"
              className="footer-right-text"
            >
              VKontakte
            </a>
          </span>
        </div>
        <div className="social-pair">
          <img
            src={`${base}/images/whatsapp.png`}
            alt="WhatsApp"
            className="social-icon"
          />
          <span>
            <a
              href="https://wa.me/79998887766"
              target="_blank"
              rel="noreferrer"
              className="footer-right-text"
            >
              WhatsApp
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
