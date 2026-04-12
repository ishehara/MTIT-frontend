import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const repairService = {
  // Create a new repair job
  create: async (repairData) => {
    try {
      const response = await api.post('/gateway/repairs', repairData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create repair job');
    }
  },

  // Get all repair jobs
  getAll: async () => {
    try {
      const response = await api.get('/gateway/repairs');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch repair jobs');
    }
  },

  // Get repair job by ID
  getById: async (jobId) => {
    try {
      const response = await api.get(`/gateway/repairs/${jobId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch repair job');
    }
  },

  // Get repair jobs by status
  getByStatus: async (status) => {
    try {
      const response = await api.get(`/gateway/repairs/status/${status}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch repair jobs by status');
    }
  },

  // Update repair job status
  updateStatus: async (jobId, statusData) => {
    try {
      const response = await api.patch(`/gateway/repairs/${jobId}/status`, statusData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update repair status');
    }
  },

  // Update repair job details
  update: async (jobId, jobData) => {
    try {
      const response = await api.put(`/gateway/repairs/${jobId}`, jobData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update repair job');
    }
  },

  // Delete repair job
  delete: async (jobId) => {
    try {
      await api.delete(`/gateway/repairs/${jobId}`);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to delete repair job');
    }
  },
};

export default repairService;
