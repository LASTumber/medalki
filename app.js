require('dotenv').config();  // Подключаем dotenv в самом начале

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const adminCards = require('./routes/adminCards');
app.use('/api/admin', adminCards);

const schemaRoutes = require('./routes/schema');
app.use('/api', schemaRoutes);

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Создаем пул соединений с БД, используя переменные из .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Обработчик GET /api/cards?section=...&category=...
app.get('/api/cards', async (req, res) => {
  const { section, category } = req.query;

  if (!section || !category) {
    return res
      .status(400)
      .json({ error: 'Необходимо указать параметры: section и category' });
  }

  try {
    const [rows] = await pool.query(
      `
      SELECT
        c.id,
        c.title,
        c.description,
        c.image_url AS imageUrl
      FROM cards AS c
      JOIN categories AS cat
        ON c.category_id = cat.id
      JOIN sections AS s
        ON cat.section_id = s.id
      WHERE s.name   = ?
        AND cat.name = ?`,
      [section, category]
    );

    res.json(rows);
  } catch (err) {
    console.error('Ошибка при получении карточек:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});


// Запуск сервера
app.listen(port, () => {
  console.log(`✅ API-сервер запущен на http://localhost:${port}`);
  console.log('DB_USER:', process.env.DB_USER);  // Проверка загрузки переменных
});
