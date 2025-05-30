const express = require('express');
const router  = express.Router();
const pool    = require('../config/db');  

// GET /api/sections — список разделов
router.get('/sections', async (req, res) => {
  try {
    // Убираем выбор несуществующего поля label
    const [rows] = await pool.query(`
      SELECT 
        id, 
        name 
      FROM sections
    `);
    res.json(rows);
  } catch (err) {
    console.error('Ошибка получения разделов:', err);
    res.status(500).json({ error: 'Ошибка получения разделов' });
  }
});

// GET /api/categories?section=medals — категории для раздела
router.get('/categories', async (req, res) => {
  const { section } = req.query;
  if (!section) {
    return res.status(400).json({ error: 'Нужно указать section' });
  }

  try {
    const [rows] = await pool.query(
      `
      SELECT 
        cat.id, 
        cat.name, 
        cat.label
      FROM categories AS cat
      JOIN sections   AS s   ON cat.section_id = s.id
      WHERE s.name = ?
      `,
      [section]
    );
    res.json(rows);
  } catch (err) {
    console.error('Ошибка получения категорий:', err);
    res.status(500).json({ error: 'Ошибка получения категорий' });
  }
});

module.exports = router;
