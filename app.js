require('dotenv').config();     // загружаем .env сразу
const express = require('express');
const cors    = require('cors');
const pool    = require('./config/db');  // подключаем единый пул
const nodemailer = require('nodemailer');

const adminCards   = require('./routes/adminCards');
const schemaRoutes = require('./routes/schema');
const sendEmailRouter = require('./routes/send-email');

const app  = express();
const port = process.env.PORT || 3001;

// Подключаем парсеры и CORS
app.use(cors());
app.use(express.json());

// Настройка Nodemailer транспорта
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // например, smtp.gmail.com
  port: +process.env.SMTP_PORT || 465,
  secure: process.env.SMTP_SECURE === 'true',  // true для 465, false для других портов
  auth: {
    user: process.env.SMTP_USER,     // ваша почта
    pass: process.env.SMTP_PASS,     // пароль или app‑password
  },
});

// Проверяем готовность транспорта при старте
transporter.verify((err, success) => {
  if (err) console.error('Ошибка подключения к SMTP:', err);
  else console.log('✅ SMTP готов к отправке сообщений');
});

// Роуты админки (POST/GET/DELETE /api/admin/cards)
app.use('/api/admin', adminCards);

// Роуты схемы (GET /api/sections, GET /api/categories)
app.use('/api', schemaRoutes);

app.use('/api', sendEmailRouter)

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


// Запуск сервера
app.listen(port, () => {
  console.log(`✅ API-сервер запущен на http://localhost:${port}`);
});