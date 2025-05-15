const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Включаем CORS и JSON-парсинг
app.use(cors());
app.use(express.json());

// Имитированная "база данных"
const cardsDB = {
  medals: {
    tab1: [
      { id: 1, title: 'Медаль A1', description: 'Описание медали A1', imageUrl: '/img/medals/a1.jpg' },
      { id: 2, title: 'Медаль A2', description: 'Описание медали A2', imageUrl: '/img/medals/a2.jpg' },
    ],
    tab2: [
      { id: 3, title: 'Медаль B1', description: 'Описание медали B1', imageUrl: '/img/medals/b1.jpg' },
    ],
  },

  cups: {
    tab1: [
      { id: 4, title: 'Кубок A1', description: 'Описание кубка A1', imageUrl: '/img/cups/a1.jpg' },
      { id: 5, title: 'Кубок A2', description: 'Описание кубка A2', imageUrl: '/img/cups/a2.jpg' },
    ],
    tab2: [
      { id: 6, title: 'Кубок B1', description: 'Описание кубка B1', imageUrl: '/img/cups/b1.jpg' },
    ],
  },

  statues: {
    tab1: [
      { id: 7, title: 'Статуэтка A1', description: 'Описание статуэтки A1', imageUrl: '/img/statues/a1.jpg' },
    ],
    tab2: [
      { id: 8, title: 'Статуэтка B1', description: 'Описание статуэтки B1', imageUrl: '/img/statues/b1.jpg' },
    ],
  },
};

// Универсальный маршрут получения карточек
app.get('/api/cards', (req, res) => {
  const { section, category } = req.query;

  if (!section || !category) {
    return res.status(400).json({ error: 'Необходимо указать параметры: section и category' });
  }

  const sectionData = cardsDB[section];
  if (!sectionData) {
    return res.status(404).json({ error: `Раздел '${section}' не найден` });
  }

  const cards = sectionData[category] || [];
  res.json(cards);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`✅ API-сервер запущен на http://localhost:${port}`);
});
