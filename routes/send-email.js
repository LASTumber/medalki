// routes/send-email.js
const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Настройка SMTP-транспортера
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT || 465,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Проверка SMTP соединения
transporter.verify(error => {
  if (error) {
    console.error('❌ Ошибка SMTP:', error);
  } else {
    console.log('✅ SMTP готов к отправке сообщений');
  }
});

// POST /api/send-email
router.post('/send-email', async (req, res) => {
  const { name, phone, email, comment } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ error: 'Обязательные поля: name, phone, email' });
  }

  const mailOptions = {
    from: `"Заявка с сайта" <${process.env.SMTP_USER}>`,
    to: 'rufer463@gmail.com', // фиксированный получатель
    subject: `Новая заявка от ${name}`,
    text: `Имя: ${name}\nТелефон: ${phone}\nEmail клиента: ${email}\nКомментарий: ${comment || '-'}`,
    html: `
      <h2>Новая заявка с сайта</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Email клиента:</strong> ${email}</p>
      <p><strong>Комментарий:</strong> ${comment || '-'}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📩 Письмо отправлено:', info.messageId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Ошибка при отправке письма:', error);
    res.status(500).json({ error: 'Не удалось отправить письмо' });
  }
});

module.exports = router;
