import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const HeroSection = () => {
  // Если приложение будет развернуто не в корне домена, 
  // лучше использовать PUBLIC_URL:
  const base = process.env.PUBLIC_URL || '';

  const gallery = [
    `${base}/images/hero1.jpg`,
    `${base}/images/hero2.jpg`,
    `${base}/images/hero3.jpg`,
    `${base}/images/hero4.jpg`,
    `${base}/images/hero5.jpg`,
  ];

  return (
    <section className="hero">
      {/* === Галерея узких фото слева === */}
      <div className="hero-gallery">
        {gallery.map((src, i) => (
          <div className="hero-gallery-item" key={i}>
            <img src={src} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* === Контент справа === */}
      <div className="hero-content">
        <img
          src={`${base}/images/logo.png`}
          alt="Логотип"
          className="hero-logo"
        />
        <h1>
          ИЗГОТОВЛЕНИЕ
          <br />
          НАГРАД НА
          <br />
          ЗАКАЗ
        </h1>
        <p>
          ПРОФЕССИОНАЛЬНОЕ ПРОИЗВОДСТВО НАГРАД
          <br />
          ИЗ РАЗЛИЧНЫХ МАТЕРИАЛОВ
          <br />
          С ИНДИВИДУАЛЬНЫМ ДИЗАЙНОМ
        </p>
        <Link to="/medals" className="hero-button">
          ПОСМОТРЕТЬ РАБОТЫ
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
