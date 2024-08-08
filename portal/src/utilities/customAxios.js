import axios from 'axios';

const customAxios = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'http://localhost:3000',
  timeout: 20000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default customAxios;
