import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import img1 from '../../images/hero1.jpg';
import img2 from '../../images/hero2.jpg';
import img3 from '../../images/hero3.jpg';
import img4 from '../../images/hero4.jpg';
import img5 from '../../images/hero5.jpg';
import './Hero.css';

const HeroSection = () => (
  <section className="hero">
    {/* === Галерея узких фото слева === */}
    <div className="hero-gallery">
      {[img1, img2, img3, img4, img5].map((src, i) => (
        <div className="hero-gallery-item" key={i}>
          <img src={src} alt={`Slide ${i + 1}`} />
        </div>
      ))}
    </div>
    {/* === Контент справа === */}
    <div className="hero-content">
      <img src={logo} alt="Логотип" className="hero-logo" />
      <h1>
        ИЗГОТОВЛЕНИЕ<br/>
        НАГРАД НА<br/>
        ЗАКАЗ
      </h1>
      <p>
        ПРОФЕССИОНАЛЬНОЕ ПРОИЗВОДСТВО НАГРАД<br/>
        ИЗ РАЗЛИЧНЫХ МАТЕРИАЛОВ<br/>
        С ИНДИВИДУАЛЬНЫМ ДИЗАЙНОМ
      </p>
      <Link to="/medals" className="hero-button">
        ПОСМОТРЕТЬ РАБОТЫ
      </Link>
    </div>

  </section>
);

export default HeroSection;
