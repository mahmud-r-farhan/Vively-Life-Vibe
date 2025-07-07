import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { registerSchema } from '../lib/zodSchemas';
import ImageUpload from '../components/common/ImageUpload';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { User, Mail, Lock, Phone, FileText } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    contact: '',
    bio: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      registerSchema.parse(formData);
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (profilePicture) data.append('profilePicture', profilePicture);
      await register(data);
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
      <h2 className="text-2xl font-bold text-primary mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ImageUpload onChange={setProfilePicture} />
        <div className="flex items-center border rounded-lg p-2">
          <User className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full outline-none"
          />
        </div>
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
        <div className="flex items-center border rounded-lg p-2">
          <User className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full outline-none"
          />
        </div>
        <div className="flex items-center border rounded-lg p-2">
          <User className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full outline-none"
          />
        </div>
        <div className="flex items-center border rounded-lg p-2">
          <Phone className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Contact (optional)"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="w-full outline-none"
          />
        </div>
        <div className="flex items-center border rounded-lg p-2">
          <FileText className="w-5 h-5 text-gray-500 mr-2" />
          <textarea
            placeholder="Bio (optional)"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full outline-none"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
        >
          Register
        </button>
      </form>
    </motion.div>
  );
};

export default RegisterPage;