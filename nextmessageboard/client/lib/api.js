import axios from 'axios';

export const userAPI = axios.create();

export const api = axios.create({
  withCredentials: true,
  baseURL: `${(process && process.env && process.env.API_URL) || ''}/api/v0/`,
  timeout: 10000,
});
