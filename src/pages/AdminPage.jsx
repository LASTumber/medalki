import React, { useState, useEffect } from 'react';
import api from '../api';

function AdminPage() {
  const [sections, setSections]     = useState([]);
  const [categories, setCategories] = useState({});
  const [cards, setCards]           = useState([]);

  const [form, setForm] = useState({
    section: '',
    category: '',
    title: '',
    description: '',
    imageUrl: ''
  });

  // Загрузка разделов и категорий при монтировании
  useEffect(() => {
    async function fetchSchema() {
      // предполагаем, что есть эндпоинты для sections и categories
      const { data: secs } = await api.get('/sections');
      setSections(secs);
      // для каждой секции подгружаем категории
      const catObj = {};
      await Promise.all(secs.map(async sec => {
        const { data: cats } = await api.get('/categories', { params: { section: sec.name } });
        catObj[sec.name] = cats;
      }));
      setCategories(catObj);
    }
    fetchSchema();
    fetchCards();
  }, []);

  // Загрузка существующих карточек
  async function fetchCards() {
    const { data } = await api.get('/admin/cards');
    setCards(data);
  }

  // Обработчики формы
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSectionChange = e => {
    const section = e.target.value;
    setForm(f => ({ ...f, section, category: '' }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post('/admin/cards', form);
    setForm({ section: '', category: '', title: '', description: '', imageUrl: '' });
    fetchCards();
  }

  async function handleDelete(id) {
    if (window.confirm('Удалить карточку?')) {
      await api.delete(`/admin/cards/${id}`);
      fetchCards();
    }
  }

  return (
    <div className="admin-page">
      <h2>Админ‑панель: Карточки</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Раздел:
          <select name="section" value={form.section} onChange={handleSectionChange} required>
            <option value="">— выбрать —</option>
            {sections.map(sec =>
              <option key={sec.id} value={sec.name}>{sec.name}</option>
            )}
          </select>
        </label>

        <label>
          Категория:
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">— выбрать —</option>
            {(categories[form.section] || []).map(cat =>
              <option key={cat.id} value={cat.name}>{cat.label}</option>
            )}
          </select>
        </label>

        <label>
          Название:
          <input name="title" value={form.title} onChange={handleChange} required/>
        </label>

        <label>
          Описание:
          <textarea name="description" value={form.description} onChange={handleChange}/>
        </label>

        <label>
          URL картинки:
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange}/>
        </label>

        <button type="submit">Добавить</button>
      </form>

      <h3>Существующие карточки</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Раздел</th><th>Категория</th><th>Название</th><th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {cards.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.section}</td>
              <td>{c.category}</td>
              <td>{c.title}</td>
              <td>
                <button onClick={() => handleDelete(c.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
