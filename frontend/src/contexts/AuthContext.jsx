import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, getProfile } from '../services/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      toast.error('Session expired or invalid. Please log in again.');
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      localStorage.setItem('token', response.data.token);
      await fetchProfile(response.data.token);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.info('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);