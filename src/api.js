import axios from 'axios';

// create a preconfigured axios instance that uses the VITE_API_BASE_URL env var
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || ''
});

export default API;
  