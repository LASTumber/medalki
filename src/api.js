// src/api.js
import axios from 'axios';

const DEV_API = process.env.REACT_APP_API_URL; // например "http://localhost:3001"
const baseURL = DEV_API
  ? `${DEV_API.replace(/\/$/, '')}/api`  // если задан REACT_APP_API_URL, добавляем `/api`
  : '/api';                          

const api = axios.create({
  baseURL,
  timeout: 5000,
});

export default api;
