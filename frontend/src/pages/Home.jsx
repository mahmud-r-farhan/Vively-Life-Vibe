import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Vively Life</h1>
      <p className="text-lg text-gray-600 mb-6">
        {user ? `Hello, ${user.data.username}!` : 'Please login or register to continue.'}
      </p>
      {!user && (
        <div className="space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition"
          >
            Register
          </button>
        </div>
      )}
      {user && (
        <button
          onClick={() => navigate('/users')}
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition"
        >
          View Users
        </button>
      )}
    </motion.div>
  );
};

export default Home;