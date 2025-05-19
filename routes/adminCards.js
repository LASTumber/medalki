const express = require('express');
const router  = express.Router();
const pool    = require('../config/db');

// Получить все карточки (для админки)
router.get('/cards', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.id, s.name AS section, cat.name AS category,
              c.title, c.description, c.image_url AS imageUrl
       FROM cards c
       JOIN categories cat ON c.category_id = cat.id
       JOIN sections s     ON cat.section_id = s.id
       ORDER BY c.id`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении карточек' });
  }
});

// Создать новую карточку
router.post('/cards', async (req, res) => {
  const { section, category, title, description, imageUrl } = req.body;
  try {
    // получаем category_id по имени раздела и категории
    const [[cat]] = await pool.query(
      `SELECT cat.id
       FROM categories cat
       JOIN sections s ON cat.section_id = s.id
       WHERE s.name = ? AND cat.name = ?`,
      [section, category]
    );
    const [result] = await pool.query(
      `INSERT INTO cards (category_id, title, description, image_url)
       VALUES (?, ?, ?, ?)`,
      [cat.id, title, description, imageUrl]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при создании карточки' });
  }
});

// Обновить карточку
router.put('/cards/:id', async (req, res) => {
  const { id } = req.params;
  const { section, category, title, description, imageUrl } = req.body;
  try {
    // найти category_id
    const [[cat]] = await pool.query(
      `SELECT cat.id
       FROM categories cat
       JOIN sections s ON cat.section_id = s.id
       WHERE s.name = ? AND cat.name = ?`,
      [section, category]
    );
    await pool.query(
      `UPDATE cards
       SET category_id = ?, title = ?, description = ?, image_url = ?
       WHERE id = ?`,
      [cat.id, title, description, imageUrl, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при обновлении карточки' });
  }
});

// Удалить карточку
router.delete('/cards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM cards WHERE id = ?`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при удалении карточки' });
  }
});

module.exports = router;