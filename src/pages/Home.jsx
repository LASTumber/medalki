import React from 'react';
import HeroSection from '../components/Hero/Hero';
import WorkStages from '../components/Advantages/WorkStages';
import MedalTypesSection from '../components/MedalCarousel/MedalTypesSection';
import CTASection from '../components/CTASection/CTASection';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
import steel from '../images/steel.jpg';
import cast from '../images/cast.jpg';
import acrylic from '../images/acrylic.jpeg';
import multilay from '../images/multilay.jpg';
import copyright from '../images/copyright.jpg';
import blank from '../images/blank.jpg';
import sale1 from '../images/sale1.jpg';
import sale2 from '../images/sale2.png';
import sale3 from '../images/sale3.png';
import adv1 from '../images/adv4.png';
import adv2 from '../images/adv1.png';
import adv3 from '../images/adv3.png';
import adv4 from '../images/adv2.png';


const Home = () => {
  const workStages = [
    { 
      title: "ПРОИЗВОДСТВО", 
      description: "МЕСТНОЕ ПРОИЗВОДСТВО ГАРАНТИРУЕТ НИЗКУЮ СТОИМОСТЬ", 
      image: adv1
    },
    { 
      title: "ГИБКОСТЬ",   
      description: "ИЗГОТОВИМ МЕДАЛЬ ЛЮБОГО ФОРМАТА, МАТЕРИАЛА И РАЗМЕРА", 
      image: adv2
    },
    { 
      title: "ДИЗАЙН",    
      description: "СОЗДАДИМ УНИКАЛЬНЫЙ ДИЗАЙН ПО ВАШИМ ПРЕДПОЧТЕНИЯМ", 
      image: adv3
    },
    { 
      title: "ОПЕРАТИВНОСТЬ", 
      description: "СРОКИ ПРОИЗВОДСТВА ВСЕГО ОТ 5 ДНЕЙ", 
      image: adv4
    }
  ];

  const medalTypes = [
    { type: 'cast',   title: 'Литые медали',   image: cast },
    { type: 'steel',  title: 'Стальные медали', image: steel },
    { type: 'acrylic',title: 'Акриловые медали', image: acrylic },
    { type: 'multilay',title: 'Многослойные медали', image: multilay },
    { type: 'copyright',title: 'Авторские медали', image: copyright },
    { type: 'blank',title: 'Медали из заготовок', image: blank }
  ];

  const imageArray = [
      sale1, sale2, sale3
  ];

  return (
    <div className="home-page">
      <HeroSection />
      <ImageCarousel images={imageArray}/>
      <MedalTypesSection types={medalTypes} />
      <WorkStages stages={workStages} />
      <CTASection />
    </div>
  );
};

export default Home;
