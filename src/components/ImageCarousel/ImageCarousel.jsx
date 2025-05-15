import React, { useState, useEffect, useRef } from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images, autoPlayInterval = 8000 }) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (autoPlayInterval > 0) {
      const id = setTimeout(() => {
        setCurrent(prev => (prev + 1) % images.length);
      }, autoPlayInterval);
      return () => clearTimeout(id);
    }
  }, [current, autoPlayInterval, images.length]);
  

  return (
    <div className="carousel-container">
      <button className="carousel-arrow left" onClick={prevSlide} aria-label="Previous">&lt;</button>
      <div className="carousel-slide">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={index === current ? 'carousel-image-visible' : 'carousel-image-hidden'}
          />
        ))}
      </div>
      <button className="carousel-arrow right" onClick={nextSlide} aria-label="Next">&gt;</button>
    </div>
  );
};

export default ImageCarousel;
