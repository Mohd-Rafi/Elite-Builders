import axios from 'axios';
// baseURL: 'http://localhost:3000',
// baseURL: 'https://backend.testing4.xyz',

const customAxios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 9000,
});

export default customAxios;
