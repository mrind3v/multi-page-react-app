import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productApi = {
  // Get all products
  getAll: async () => {
    const response = await apiClient.get('/products');
    return response.data;
  },

  // Get single product by ID
  getById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Get products by category
  getByCategory: async (category) => {
    const response = await apiClient.get(`/products?category=${category}`);
    return response.data;
  },

  // Create new product
  create: async (product) => {
    const response = await apiClient.post('/products', product);
    return response.data;
  },

  // Update product
  update: async (id, product) => {
    const response = await apiClient.put(`/products/${id}`, product);
    return response.data;
  },

  // Delete product
  delete: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};

// Users API
export const userApi = {
  // Get all users
  getAll: async () => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  // Get single user by ID
  getById: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  // Update user
  update: async (id, user) => {
    const response = await apiClient.put(`/users/${id}`, user);
    return response.data;
  },
};

export default apiClient;
