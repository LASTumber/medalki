import React, { useState } from 'react';
import whatsapp from '../../images/whatsapp.png';
import { Link } from 'react-router-dom';
import CTAModal from '../CTAModal/CTAModal';
import CTASection from '../CTASection/CTASection';
import './Header.css';
import '../CTAModal/CTAModal.css';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCtaOpen, setCtaOpen]   = useState(false);

  const toggleMenu = () => setMenuOpen(open => !open);
  const openCta    = () => setCtaOpen(true);
  const closeCta   = () => setCtaOpen(false);

  return (
    <header className="header">
      <nav className="nav-container">
        {/* Левая часть с меню */}
        <div className="nav-left">
          <div className="menu-container">
            <button className="menu-button" onClick={toggleMenu}>☰</button>
            <span className="menu-text">МЕНЮ</span>
          </div>
          {isMenuOpen && <div className="overlay" onClick={toggleMenu} />}
          <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
            <div className="side-menu-content">
              <Link to="/" onClick={toggleMenu}>ГЛАВНАЯ</Link>
              <Link to="/medals" onClick={toggleMenu}>МЕДАЛИ</Link>
              <Link to="/ribbons" onClick={toggleMenu}>НАГРАДЫ</Link>
              <button className="order-button" onClick={() => { toggleMenu(); openCta(); }}>
                СДЕЛАТЬ ЗАКАЗ
              </button>
            </div>
          </div>
          <div className="nav-links">
            <Link to="/">ГЛАВНАЯ</Link>
            <Link to="/medals">МЕДАЛИ</Link>
            <Link to="/ribbons">НАГРАДЫ</Link>
          </div>
        </div>

        {/* Правая часть со ссылками */}
        <div className="nav-right">
          <button className="order-button" onClick={openCta}>
            СДЕЛАТЬ ЗАКАЗ
          </button>
          <div className="social-links">
            <img src={whatsapp} alt="WhatsApp" width="50" height="50" />
            <div className="social-text">
              <a href="https://wa.me/79998887766" target="_blank" rel="noreferrer">
                +7 999 888 77 66
              </a>
              <a href="https://wa.me/79871732778" target="_blank" rel="noreferrer">
                +7 987 173 27 78
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* === Модалка CTA === */}
      {isCtaOpen && (
        <CTAModal isOpen={isCtaOpen} onClose={closeCta}>
        <CTASection />
      </CTAModal>
      )}
    </header>
  );
};

export default Header;
