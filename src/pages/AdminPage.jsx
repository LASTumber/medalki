import React, { useState, useEffect } from 'react';
import api from '../api';

function AdminPage() {
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState({});
  const [cards, setCards] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ section: '', category: '', title: '', description: '', imageUrl: '' });

  useEffect(() => {
    async function load() {
      const { data: secs } = await api.get('/sections');
      setSections(secs);
      const catObj = {};
      await Promise.all(secs.map(async sec => {
        const { data: cats } = await api.get('/categories', { params: { section: sec.name } });
        catObj[sec.name] = cats;
      }));
      setCategories(catObj);
      fetchCards();
    }
    load();
  }, []);

  async function fetchCards() {
    const { data } = await api.get('/admin/cards');
    setCards(data);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSectionChange = e => {
    const section = e.target.value;
    setForm(f => ({ ...f, section, category: '' }));
  };

  const startEdit = card => {
    setEditingId(card.id);
    setForm({
      section: card.section,
      category: card.category,
      title: card.title,
      description: card.description,
      imageUrl: card.imageUrl || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ section: '', category: '', title: '', description: '', imageUrl: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/admin/cards/${editingId}`, form);
    } else {
      await api.post('/admin/cards', form);
    }
    cancelEdit();
    fetchCards();
  };

  const handleDelete = async id => {
    if (window.confirm('Удалить карточку?')) {
      await api.delete(`/admin/cards/${id}`);
      fetchCards();
    }
  };

  return (
    <div className="admin-page">
      <h2>Админ‑панель: Карточки</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Раздел:
          <select name="section" value={form.section} onChange={handleSectionChange} required>
            <option value="">— выбирать —</option>
            {sections.map(sec => <option key={sec.id} value={sec.name}>{sec.name}</option>)}
          </select>
        </label>
        <label>
          Категория:
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">— выбирать —</option>
            {(categories[form.section] || []).map(cat => (
              <option key={cat.id} value={cat.name}>{cat.label}</option>
            ))}
          </select>
        </label>
        <label>
          Название:
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Описание:
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>
        <label>
          URL картинки:
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="/images/your.jpg" />
        </label>
        <button type="submit">{editingId ? 'Сохранить' : 'Добавить'}</button>
        {editingId && <button type="button" onClick={cancelEdit}>Отмена</button>}
      </form>

      <h3>Существующие карточки</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Раздел</th><th>Категория</th><th>Название</th><th>URL картинки</th><th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {cards.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.section}</td>
              <td>{c.category}</td>
              <td>{c.title}</td>
              <td><code>{c.imageUrl}</code></td>
              <td>
                <button onClick={() => startEdit(c)}>✏️</button>
                <button onClick={() => handleDelete(c.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;