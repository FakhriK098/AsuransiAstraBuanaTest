import axios from 'axios';
import Constant from '../constants';

export const api = axios.create({
  baseURL: Constant.BaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    console.log('API Request:', config.url);
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('Response Error:', error);
    if (error.response) {
      console.error('Error Data:', error.response.data);
      console.error('Error Status:', error.response.status);
    }
    return Promise.reject(error);
  },
);
