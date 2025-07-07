import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../lib/api';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { getResizedImage } from '../lib/cloudinary';
import { useNavigate } from 'react-router-dom';
import { User, Edit, Trash } from 'lucide-react';

const UsersPage = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch users');
    return <div>Error</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {users.data.map((user) => (
        <motion.div
          key={user._id}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white p-4 rounded-lg shadow-lg"
        >
          <img
            src={getResizedImage(user.profilePicture.split('/').pop().split('.')[0], 48, 48)}
            alt={user.username}
            className="w-12 h-12 rounded-full mx-auto mb-2"
          />
          <h3 className="text-lg font-semibold text-primary">{user.username}</h3>
          <p>{user.firstName} {user.lastName}</p>
          <p>{user.email}</p>
          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={() => navigate(`/users/edit/${user._id}`)}
              className="p-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={async () => {
                try {
                  await deleteUser(user._id);
                  toast.success('User deleted');
                } catch (err) {
                  toast.error('Failed to delete user');
                }
              }}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default UsersPage;