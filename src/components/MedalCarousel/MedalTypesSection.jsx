import React from 'react';
import { Link } from 'react-router-dom';
import './MedalTypesSection.css';

const MedalTypesSection = ({ types }) => (
  <section className="medal-types">
    <h2>Наша продукция</h2>
    <div className="types-grid">
      {types.map((medal) => (
        <Link
          key={medal.type}
          to={`/medals`}
          className="type-card"
        >
          <img src={medal.image} alt={medal.title} className="type-card__img" />
          <div className="type-card__overlay">
            <h3 className="type-card__title">{medal.title}</h3>
            <button className="type-card__button">Подробнее</button>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default MedalTypesSection;
