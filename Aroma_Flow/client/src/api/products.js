import axios from 'axios';

const API = 'http://localhost:5001/api';

export const getProducts = () => axios.get(`${API}/products`).then(res => res.data);

export const getProductById = (id) => axios.get(`${API}/products/${id}`).then(res => res.data);
