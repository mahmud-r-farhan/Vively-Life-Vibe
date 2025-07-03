import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred.';
    if (error.response?.status === 401) {
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (message.includes('Cloudinary')) {
      toast.error('Image upload failed. Please check file size and format.');
    } else {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

const retryRequest = async (config, retries = 2) => {
  try {
    return await api(config);
  } catch (error) {
    if (retries > 0 && error.code === 'ECONNABORTED') {
      return retryRequest(config, retries - 1);
    }
    throw error;
  }
};

export const registerUser = (data) => retryRequest({ method: 'post', url: '/auth/register', data });
export const loginUser = (data) => retryRequest({ method: 'post', url: '/auth/login', data });
export const getProfile = () => retryRequest({ method: 'get', url: '/profile' });
export const getUsers = (page = 1, limit = 9) => retryRequest({ method: 'get', url: `/users?page=${page}&limit=${limit}` });
export const getUserById = (id) => retryRequest({ method: 'get', url: `/users/${id}` });
export const createUser = (data) => retryRequest({ method: 'post', url: '/users', data });
export const updateUser = (id, data) => retryRequest({ method: 'put', url: `/users/${id}`, data });
export const deleteUser = (id) => retryRequest({ method: 'delete', url: `/users/${id}` });