import React from 'react';
import HeroSection from '../components/Hero/Hero';
import WorkStages from '../components/Advantages/WorkStages';
import MedalTypesSection from '../components/MedalCarousel/MedalTypesSection';
import CTASection from '../components/CTASection/CTASection';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';

const Home = () => {
  // Базовый путь к public (на случай деплоя в подпапке)
  const base = process.env.PUBLIC_URL || '';

  const workStages = [
    { 
      title: 'ПРОИЗВОДСТВО', 
      description: 'МЕСТНОЕ ПРОИЗВОДСТВО ГАРАНТИРУЕТ НИЗКУЮ СТОИМОСТЬ', 
      image: `${base}/images/adv4.png`,
    },
    { 
      title: 'ГИБКОСТЬ',   
      description: 'ИЗГОТОВИМ МЕДАЛЬ ЛЮБОГО ФОРМАТА, МАТЕРИАЛА И РАЗМЕРА', 
      image: `${base}/images/adv1.png`,
    },
    { 
      title: 'ДИЗАЙН',    
      description: 'СОЗДАДИМ УНИКАЛЬНЫЙ ДИЗАЙН ПО ВАШИМ ПРЕДПОЧТЕНИЯМ', 
      image: `${base}/images/adv3.png`,
    },
    { 
      title: 'ОПЕРАТИВНОСТЬ', 
      description: 'СРОКИ ПРОИЗВОДСТВА ВСЕГО ОТ 5 ДНЕЙ', 
      image: `${base}/images/adv2.png`,
    }
  ];

  const medalTypes = [
    { type: 'cast',    title: 'Литые медали',           image: `${base}/images/cast.jpg` },
    { type: 'steel',   title: 'Стальные медали',        image: `${base}/images/steel.jpg` },
    { type: 'acrylic', title: 'Акриловые медали',       image: `${base}/images/acrylic.jpeg` },
    { type: 'multilay',title: 'Многослойные медали',    image: `${base}/images/multilay.jpg` },
    { type: 'copyright', title: 'Авторские медали',     image: `${base}/images/copyright.jpg` },
    { type: 'blank',   title: 'Медали из заготовок',    image: `${base}/images/blank.jpg` }
  ];

  const imageArray = [
    `${base}/images/sale1.jpg`,
    `${base}/images/sale2.png`,
    `${base}/images/sale3.png`,
  ];

  return (
    <div className="home-page">
      <HeroSection />
      <ImageCarousel images={imageArray} />
      <MedalTypesSection types={medalTypes} />
      <WorkStages stages={workStages} />
      <CTASection />
    </div>
  );
};

export default Home;
