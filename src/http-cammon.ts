import axios from 'axios';

axios.create({
  baseURL: 'https://localhost:3000',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});
