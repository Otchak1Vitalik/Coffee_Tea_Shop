import axios from 'axios';

const API = 'http://localhost:5001/api';

export const getAdminData = () => axios.get(`${API}/admin/data`).then(res => res.data);

export const createProduct = (data) => axios.post(`${API}/admin/products`, data).then(res => res.data);
