import axios from 'axios';

const API = 'http://localhost:5001/api';

export const createOrder = (data) => axios.post(`${API}/orders`, data).then(res => res.data);
