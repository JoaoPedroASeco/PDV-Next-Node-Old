import axios from 'axios';
import ip from './ip'

const api = axios.create({
  baseURL: `http://${ip}:3333`,
});

export default api;
