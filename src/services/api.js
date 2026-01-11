import axios from 'axios';
import { auth } from '../config/firebase';

// API base URL - update this to your Flask backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Firebase token to all requests
api.interceptors.request.use(
  async (config) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
      
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        console.error('Unauthorized - redirecting to login');
        // You can add logout logic here if needed
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ==================== User API ====================

export const userAPI = {
  // Get current user data (auto-creates in MongoDB)
  getCurrentUser: async () => {
    const response = await api.get('/api/user/me');
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/api/user/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/api/user/profile', { profile: profileData });
    return response.data;
  },

  // Update user role
  updateRole: async (role) => {
    const response = await api.put('/api/user/role', { role });
    return response.data;
  },

  // Register user with additional data
  registerUser: async (userData) => {
    const response = await api.post('/api/user/register', userData);
    return response.data;
  },
};

// ==================== AI API ====================

export const aiAPI = {
  // Speech-to-Text
  transcribeAudio: async (audioFile, language = 'en') => {
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('language', language);
    
    const response = await api.post('/api/ai/stt/transcribe', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getSTTLanguages: async () => {
    const response = await api.get('/api/ai/stt/languages');
    return response.data;
  },

  // Text-to-Speech
  synthesizeSpeech: async (text, language = 'en', slow = false) => {
    const response = await api.post(
      '/api/ai/tts/synthesize',
      { text, language, slow },
      { responseType: 'blob' }
    );
    return response.data;
  },

  getTTSLanguages: async () => {
    const response = await api.get('/api/ai/tts/languages');
    return response.data;
  },

  // Posture Analysis
  analyzePosture: async (imageFile, includeVisualization = false) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('include_visualization', includeVisualization);
    
    const response = await api.post('/api/ai/posture/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // AI History
  getAIHistory: async (interactionType = null, limit = 20) => {
    const params = { limit };
    if (interactionType) params.interaction_type = interactionType;
    
    const response = await api.get('/api/ai/history', { params });
    return response.data;
  },

  // AI Stats
  getAIStats: async () => {
    const response = await api.get('/api/ai/stats');
    return response.data;
  },
};

// ==================== Health Check ====================

export const healthAPI = {
  checkHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
