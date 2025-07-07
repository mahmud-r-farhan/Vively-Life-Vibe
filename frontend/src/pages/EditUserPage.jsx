import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserById, updateUser } from '../lib/api';
import { registerSchema } from '../lib/zodSchemas';
import ImageUpload from '../components/common/ImageUpload';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { User, Mail, Lock, Phone, FileText } from 'lucide-react';

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  });

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    contact: '',
    bio: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);

  const updateMutation = useMutation({
    mutationFn: (data) => updateUser(id, data),
    onSuccess: () => {
      toast.success('User updated successfully');
      navigate('/users');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Update failed'),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      registerSchema.parse(formData);
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (profilePicture) data.append('profilePicture', profilePicture);
      await updateMutation.mutateAsync(data);
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
      <h2 className="text-2xl font-bold text-primary mb-6">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ImageUpload defaultImage={user.data.profilePicture} onChange={setProfilePicture} />
        <div className="flex items-center border rounded-lg p-2">
          <User className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Username"
            value={formData.username || user.data.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full outline-none"
          />
        </div>
        <div className="flex items-center border rounded-lg p-2">
          <Mail className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Email"
            value={formData.email || user.data.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full outline-none"
          />
        </div>
        <div className="flex items-center border rounded-lg p-2">
          <User className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName || user.data.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full outline-none"
          />
        </div>
        <div className="flex items-center border rounded-lg p-2">
          <User className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName || user.data.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full outline-none"
          />
        </div>
        <div className="flex items-center border rounded-lg p-2">
          <Phone className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Contact (optional)"
            value={formData.contact || user.data.contact || ''}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="w-full outline-none"
          />
        </div>
        <div className="flex items-center border rounded-lg p-2">
          <FileText className="w-5 h-5 text-gray-500 mr-2" />
          <textarea
            placeholder="Bio (optional)"
            value={formData.bio || user.data.bio || ''}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full outline-none"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
        >
          Update User
        </button>
      </form>
    </motion.div>
  );
};

export default EditUserPage;