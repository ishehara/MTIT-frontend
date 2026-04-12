import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const staffService = {
  // Create a new staff member
  create: async (staffData) => {
    try {
      const response = await api.post('/gateway/staff', staffData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create staff member');
    }
  },

  // Get all staff members
  getAll: async () => {
    try {
      const response = await api.get('/gateway/staff');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch staff members');
    }
  },

  // Get staff member by ID
  getById: async (staffId) => {
    try {
      const response = await api.get(`/gateway/staff/${staffId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch staff member');
    }
  },

  // Update staff member
  update: async (staffId, staffData) => {
    try {
      const response = await api.put(`/gateway/staff/${staffId}`, staffData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update staff member');
    }
  },

  // Delete staff member
  delete: async (staffId) => {
    try {
      const response = await api.delete(`/gateway/staff/${staffId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to delete staff member');
    }
  },
};

export default staffService;
