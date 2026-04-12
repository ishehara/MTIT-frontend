import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const customerService = {
  // Create a new customer
  create: async (customerData) => {
    try {
      const response = await api.post('/gateway/customers', customerData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create customer');
    }
  },

  // Get all customers
  getAll: async () => {
    try {
      const response = await api.get('/gateway/customers');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch customers');
    }
  },

  // Get customer by ID
  getById: async (customerId) => {
    try {
      const response = await api.get(`/gateway/customers/${customerId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch customer');
    }
  },

  // Update customer
  update: async (customerId, customerData) => {
    try {
      const response = await api.put(`/gateway/customers/${customerId}`, customerData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update customer');
    }
  },

  // Delete customer
  delete: async (customerId) => {
    try {
      await api.delete(`/gateway/customers/${customerId}`);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to delete customer');
    }
  },
};

export default customerService;
