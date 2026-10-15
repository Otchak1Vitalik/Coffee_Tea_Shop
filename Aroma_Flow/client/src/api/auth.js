import axios from 'axios';

const API = 'http://localhost:5001/api';

export const registerUser = (data) => axios.post(`${API}/auth/register`, data).then(res => res.data);

export const loginUser = (data) => axios.post(`${API}/auth/login`, data).then(res => res.data);
