import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const inventoryService = {
  // Create a new inventory item
  create: async (itemData) => {
    try {
      const response = await api.post('/gateway/inventory', itemData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create inventory item');
    }
  },

  // Get all inventory items
  getAll: async () => {
    try {
      const response = await api.get('/gateway/inventory');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch inventory items');
    }
  },

  // Get inventory item by ID
  getById: async (itemId) => {
    try {
      const response = await api.get(`/gateway/inventory/${itemId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch inventory item');
    }
  },

  // Update inventory item
  update: async (itemId, itemData) => {
    try {
      const response = await api.put(`/gateway/inventory/${itemId}`, itemData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update inventory item');
    }
  },

  // Delete inventory item
  delete: async (itemId) => {
    try {
      const response = await api.delete(`/gateway/inventory/${itemId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to delete inventory item');
    }
  },
};

export default inventoryService;
