// src/pages/Tabs/CardGrid.jsx
import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import CTAModal from '../../components/CTAModal/CTAModal';
import CTASection from '../../components/CTASection/CTASection';
import './CardGrid.css';

export default function CardGrid({ cards }) {
  // Карточечный модал
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [selectedCard,   setSelectedCard]   = useState(null);

  // CTA-модал
  const [ctaOpen, setCtaOpen]             = useState(false);

  // Клик по плитке — открываем карточечный модал
  const onCardClick = card => {
    setSelectedCard(card);
    setCardModalOpen(true);
  };

  // «Заказать похожую» из карточечного модала
  // — закрываем его и сразу открываем CTA-модал
  const handleOrderSimilar = () => {
    setCardModalOpen(false);
    setCtaOpen(true);
  };

  return (
    <>
      {/* Карточки */}
      <div className="card-grid">
        {cards.map(card => (
          <div
            key={card.id}
            className="card"
            onClick={() => onCardClick(card)}
          >
            <img src={card.imageUrl} alt={card.title} />
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>

      {/* Карточечный модал */}
      <Modal
        isOpen={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        card={selectedCard}
        onOrder={handleOrderSimilar}
      />

      {/* CTA-модал — его анимацию и размонтирование уже обрабатывает CTAModal */}
      <CTAModal isOpen={ctaOpen} onClose={() => setCtaOpen(false)}>
        <CTASection />
      </CTAModal>
    </>
  );
}
