import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register, getProfile } from '../lib/api';
import { toast } from 'sonner';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!localStorage.getItem('token'),
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      localStorage.setItem('token', data.token);
      queryClient.invalidateQueries(['profile']);
      toast.success('Login successful');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Login failed'),
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: ({ data }) => {
      localStorage.setItem('token', data.token);
      queryClient.invalidateQueries(['profile']);
      toast.success('Registration successful');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Registration failed'),
  });

  const logout = () => {
    localStorage.removeItem('token');
    queryClient.invalidateQueries(['profile']);
    window.location.href = '/login';
  };

  return { user, isLoading, login: loginMutation.mutate, register: registerMutation.mutate, logout };
};