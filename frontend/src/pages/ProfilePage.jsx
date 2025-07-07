import { useAuth } from '../hooks/useAuth';
import { getResizedImage } from '../lib/cloudinary';
import { motion } from 'framer-motion';
import { User, Mail, Phone, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not authenticated</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <img
        src={getResizedImage(user.data.profilePicture.split('/').pop().split('.')[0], 100, 100)}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold text-primary text-center">{user.data.username}</h2>
      <div className="space-y-4 mt-4">
        <div className="flex items-center">
          <User className="w-5 h-5 text-gray-500 mr-2" />
          <p>{user.data.firstName} {user.data.lastName}</p>
        </div>
        <div className="flex items-center">
          <Mail className="w-5 h-5 text-gray-500 mr-2" />
          <p>{user.data.email}</p>
        </div>
        {user.data.contact && (
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-gray-500 mr-2" />
            <p>{user.data.contact}</p>
          </div>
        )}
        {user.data.bio && (
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-gray-500 mr-2" />
            <p>{user.data.bio}</p>
          </div>
        )}
        <button
          onClick={() => navigate(`/users/edit/${user.data._id}`)}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
        >
          Edit Profile
        </button>
      </div>
    </motion.div>
  );
};

export default ProfilePage;