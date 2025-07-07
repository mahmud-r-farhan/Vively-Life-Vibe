import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { loginSchema } from '../lib/zodSchemas';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Lock, Mail } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginSchema.parse(formData);
      await login(formData);
      navigate('/profile');
    } catch (err) {
      toast.error('Invalid input');
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border rounded-lg p-2">
          <Mail className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full outline-none"
          />
        </div>
        <div className="flex items-center border rounded-lg p-2">
          <Lock className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
        >
          Login
        </button>
      </form>
    </motion.div>
  );
};

export default LoginPage;