import axios from "axios";

const API_BASE = "http://localhost:5000/api/sweets";

export const fetchSweets = () => axios.get(API_BASE); // Get All Sweets

export const addSweet = (data) => axios.post(API_BASE, data); // Add Sweet

export const deleteSweet = (id) => axios.delete(`${API_BASE}/${id}`); // Delete Sweet

export const searchSweets = (params) =>
  axios.get(`${API_BASE}/search`, { params }); // Search Sweet

export const purchaseSweet = (id, quantity) =>
  axios.post(`${API_BASE}/purchase/${id}`, { quantity }); // Purchase Sweet

export const restockSweet = (id, quantity) =>
  axios.post(`${API_BASE}/restock/${id}`, { quantity }); // Restock Sweet
