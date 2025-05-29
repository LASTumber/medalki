const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Регистрация
router.post('/register', 
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, name } = req.body;

    try {
      // Проверяем, что email уникален
      const [exists] = await pool.query('SELECT id FROM clients WHERE email = ?', [email]);
      if (exists.length > 0) return res.status(400).json({ error: 'Email уже зарегистрирован' });

      // Хешируем пароль
      const password_hash = await bcrypt.hash(password, 10);

      // Вставляем нового пользователя
      const [result] = await pool.query(
        'INSERT INTO clients (email, password_hash, name, created_at) VALUES (?, ?, ?, NOW())',
        [email, password_hash, name]
      );

      // Создаём токен
      const token = jwt.sign({ id: result.insertId, email, name }, JWT_SECRET, { expiresIn: '7d' });

      res.json({ token, user: { id: result.insertId, email, name } });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
);

// Вход
router.post('/login', 
  body('email').isEmail(),
  body('password').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const [rows] = await pool.query('SELECT * FROM clients WHERE email = ?', [email]);
      if (rows.length === 0) return res.status(400).json({ error: 'Неверный email или пароль' });

      const user = rows[0];

      // Проверяем пароль
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(400).json({ error: 'Неверный email или пароль' });

      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

      res.json({ token, user: { id: user.id, email: user.email, name: user.name } });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
);

// Middleware для проверки JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Нет токена авторизации' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Нет токена авторизации' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Неверный токен' });
  }
}

// Получение данных текущего пользователя
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, email, name, created_at FROM clients WHERE id = ?', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Пользователь не найден' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
