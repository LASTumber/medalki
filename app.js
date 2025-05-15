require('dotenv').config();     // загружаем .env сразу
const express = require('express');
const cors    = require('cors');
const pool    = require('./config/db');  // подключаем единый пул

const adminCards   = require('./routes/adminCards');
const schemaRoutes = require('./routes/schema');

const app  = express();
const port = process.env.PORT || 3001;

// Подключаем парсеры и CORS
app.use(cors());
app.use(express.json());

// Роуты админки (POST/GET/DELETE /api/admin/cards)
app.use('/api/admin', adminCards);

// Роуты схемы (GET /api/sections, GET /api/categories)
app.use('/api', schemaRoutes);

// Публичный роут GET /api/cards?section=...&category=...
app.get('/api/cards', async (req, res) => {
  const { section, category } = req.query;
  if (!section || !category) {
    return res.status(400).json({ error: 'Укажите параметры section и category' });
  }
  try {
    const [rows] = await pool.query(
      `SELECT c.id, c.title, c.description, c.image_url AS imageUrl
       FROM cards c
       JOIN categories cat ON c.category_id = cat.id
       JOIN sections s     ON cat.section_id = s.id
       WHERE s.name = ? AND cat.name = ?`,
      [section, category]
    );
    res.json(rows);
  } catch (err) {
    console.error('Ошибка при получении карточек:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Запуск
app.listen(port, () => {
  console.log(`✅ API-сервер запущен на http://localhost:${port}`);
});
