import axios from 'axios';
// baseURL: 'http://localhost:3000',
// baseURL: 'https://backend.testing4.xyz',

const customAxios = axios.create({
  baseURL: 'https://backend.testing4.xyz',
  timeout: 9000,
});

export default customAxios;
