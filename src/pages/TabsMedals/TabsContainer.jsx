import React, { useState, useEffect } from 'react';
import TabButtons from './TabButtons.jsx';
import api from '../../api.js';
import CardGrid from './CardGrid.jsx';
import './TabsContainer.css';
import CTASection from '../../components/CTASection/CTASection.jsx';

const tabList = [
  { key: 'tab1', label: 'ЛИТЫЕ' },
  { key: 'tab2', label: 'СТАЛЬНЫЕ' },
  { key: 'tab3', label: 'АКРИЛОВЫЕ' },
  { key: 'tab4', label: 'МНОГОСЛОЙНЫЕ' },
  { key: 'tab5', label: 'АВТОРСКИЕ' },
  { key: 'tab6', label: 'ИЗ ЗАГОТОВОК' },
];

export default function TabsContainer({ section }) {
  const [activeTab, setActiveTab] = useState(tabList[0].key);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    api
      .get('/cards', {
        params: {
          section,
          category: activeTab, // ← "tab1", "tab2" и т.д.
        },
      })
      .then((res) => setCards(res.data))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [activeTab, section]);

  return (
    <div className="tabs-container">
      <h1 className="tabs-container__title">НАША ПРОДУКЦИЯ</h1>
      <TabButtons tabs={tabList} activeKey={activeTab} onChange={setActiveTab} />
      {loading && <p className="tabs-container__status">Загрузка…</p>}
      {error && <p className="tabs-container__status tabs-container__error">{error}</p>}
      {!loading && !error && <CardGrid cards={cards} />}
      <CTASection />
    </div>
  );
}
