const express = require('express');
const router = express.Router();
const pool = require('../db');

// 1. Получить все карточки с разделами и категориями
router.get('/cards', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.id, c.title, c.description, c.image_url AS imageUrl,
             s.name AS section, cat.name AS category
      FROM cards c
      JOIN categories cat ON c.category_id = cat.id
      JOIN sections s     ON cat.section_id = s.id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка получения карточек' });
  }
});

// 2. Создать новую карточку
router.post('/cards', async (req, res) => {
  const { section, category, title, description, imageUrl } = req.body;
  if (!section || !category || !title) {
    return res.status(400).json({ error: 'Необходимы section, category и title' });
  }
  try {
    // находим category_id по section+category
    const [[cat]] = await pool.query(
      `SELECT cat.id FROM categories cat
       JOIN sections s ON cat.section_id = s.id
       WHERE s.name = ? AND cat.name = ?`,
      [section, category]
    );
    if (!cat) return res.status(400).json({ error: 'Неверная секция или категория' });

    const [result] = await pool.query(
      `INSERT INTO cards (category_id, title, description, image_url)
       VALUES (?, ?, ?, ?)`,
      [cat.id, title, description || '', imageUrl || '']
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка создания карточки' });
  }
});

// 3. Удалить карточку
router.delete('/cards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM cards WHERE id = ?`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка удаления карточки' });
  }
});

module.exports = router;
