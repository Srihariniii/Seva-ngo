import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('seva_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('seva_admin_token');
        localStorage.removeItem('seva_admin_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  verify: () => api.get('/auth/verify')
};

export const causesApi = {
  getAll: (params) => api.get('/causes', { params }),
  getById: (id) => api.get(`/causes/${id}`),
  create: (formData) =>
    api.post('/causes', formData, {
      headers: formData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
    }),
  update: (id, formData) =>
    api.put(`/causes/${id}`, formData, {
      headers: formData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
    }),
  delete: (id) => api.delete(`/causes/${id}`)
};

export const eventsApi = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  register: (id, data) => api.post(`/events/${id}/register`, data),
  create: (formData) =>
    api.post('/events', formData, {
      headers: formData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
    }),
  update: (id, formData) =>
    api.put(`/events/${id}`, formData, {
      headers: formData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
    }),
  delete: (id) => api.delete(`/events/${id}`)
};

export const volunteersApi = {
  submit: (data) => api.post('/volunteers', data),
  getAll: (params) => api.get('/volunteers', { params }),
  updateStatus: (id, data) => api.put(`/volunteers/${id}`, data),
  delete: (id) => api.delete(`/volunteers/${id}`)
};

export const donationsApi = {
  create: (data) => api.post('/donations', data),
  getAll: (params) => api.get('/donations', { params }),
  getById: (id) => api.get(`/donations/${id}`),
  updateStatus: (id, data) => api.put(`/donations/${id}`, data)
};

export const galleryApi = {
  getAll: (params) => api.get('/gallery', { params }),
  upload: (formData) =>
    api.post('/gallery', formData, {
      headers: formData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
    }),
  delete: (id) => api.delete(`/gallery/${id}`)
};

export const contactApi = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  toggleRead: (id, data) => api.put(`/contact/${id}/read`, data),
  delete: (id) => api.delete(`/contact/${id}`)
};

export const testimonialsApi = {
  getAll: () => api.get('/testimonials'),
  create: (data) => api.post('/testimonials', data),
  delete: (id) => api.delete(`/testimonials/${id}`)
};

export const statsApi = {
  getDashboard: () => api.get('/stats/dashboard')
};

export default api;
