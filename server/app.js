const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Поддерживаем CORS, чтобы фронтенд мог запрашивать данные
app.use(cors());
app.use(express.json());

// Имитация базы данных
const cardsDB = {
  tab1: [
    { id: 1, title: 'Карточка A1', description: 'Описание A1', imageUrl: '/img/a1.jpg' },
    { id: 2, title: 'Карточка A2', description: 'Описание A2', imageUrl: '/img/a2.jpg' },
    { id: 3, title: 'Карточка A3', description: 'Описание A3', imageUrl: '/img/a3.jpg' },
    { id: 4, title: 'Карточка A4', description: 'Описание A4', imageUrl: '/img/a4.jpg' },
    { id: 5, title: 'Карточка A5', description: 'Описание A5', imageUrl: '/img/a5.jpg' },
    { id: 6, title: 'Карточка A6', description: 'Описание A6', imageUrl: '/img/a6.jpg' },
    { id: 7, title: 'Карточка A7', description: 'Описание A7', imageUrl: '/img/a7.jpg' },
    { id: 8, title: 'Карточка A8', description: 'Описание A8', imageUrl: '/img/a8.jpg' },
    { id: 9, title: 'Карточка A9', description: 'Описание A9', imageUrl: '/img/a9.jpg' },
    { id: 10, title: 'Карточка A10', description: 'Описание A10', imageUrl: '/img/a10.jpg' }
  ],
  tab2: [
    { id: 11, title: 'Карточка B1', description: 'Описание B1', imageUrl: '/img/b1.jpg' },
    /* … */
  ],
  // остальные категории
};

// Маршрут для получения карточек по категории
app.get('/api/cards', (req, res) => {
  const { category } = req.query;
  const cards = cardsDB[category] || [];
  res.json(cards);
});

app.listen(port, () => {
  console.log(`API-сервер запущен на http://localhost:${port}`); 
});
