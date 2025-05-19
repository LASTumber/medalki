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
  const [ctaOpen, setCtaOpen] = useState(false);

  const onCardClick = card => {
    setSelectedCard(card);
    setCardModalOpen(true);
  };

  const handleOrderSimilar = () => {
    setCardModalOpen(false);
    setCtaOpen(true);
  };

  return (
    <>
      {/* Карточки */}
      <div className="card-grid">
        {cards.length > 0 ? cards.map(card => (
          <div
            key={card.id}
            className="card"
            onClick={() => onCardClick(card)}
          >
            <img
              src={card.imageUrl}
              alt={card.title}
              className="card__image"
            />
            <h3 className="card__title">{card.title}</h3>
          </div>
        )) : (
          <div className="card-grid__empty">Нет доступных карточек</div>
        )}
      </div>

      {/* Карточечный модал */}
      <Modal
        isOpen={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        card={selectedCard}
        onOrder={handleOrderSimilar}
      />

      {/* CTA-модал */}
      <CTAModal isOpen={ctaOpen} onClose={() => setCtaOpen(false)}>
        <CTASection />
      </CTAModal>
    </>
  );
}
