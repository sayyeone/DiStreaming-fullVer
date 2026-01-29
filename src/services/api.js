import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth Services
export const authService = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  getUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
};

// Movie Services
export const movieService = {
  getMovies: (params = {}) => api.get('/movies', { params }),
  getMovieById: (id) => api.get(`/movies/${id}`),
  createMovie: (data) => api.post('/movies', data),
  updateMovie: (id, data) => api.put(`/movies/${id}`, data),
  deleteMovie: (id) => api.delete(`/movies/${id}`),
  getTrending: () => api.get('/movies/trending/list'),
};

// Category Services
export const categoryService = {
  getCategories: () => api.get('/categories'),
  getCategoryById: (id) => api.get(`/categories/${id}`),
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
};

export default api;