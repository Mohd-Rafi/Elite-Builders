import axios from 'axios';
// baseURL: 'http://localhost:3000',

const customAxios = axios.create({
  baseURL: 'https://backend.testing4.xyz',
  timeout: 20000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default customAxios;
