import axios from 'axios';

export const STORAGE_TOKEN_KEY = 'access-token';

const accessToken = localStorage.getItem(STORAGE_TOKEN_KEY);

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : null
   }
});