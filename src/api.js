import axios from 'axios';

const api = axios.create({
  baseURL: 'https://patient-list-backend.onrender.com/menu',
  headers: { 'Content-Type': 'application/json' }
});

export default api;
