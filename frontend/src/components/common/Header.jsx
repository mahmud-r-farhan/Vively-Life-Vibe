import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-primary text-white p-4 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold"><button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 hover:text-accent transition"
              >
                Vively Life
              </button></h1>
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-2 hover:text-accent transition"
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
              <button
                onClick={logout}
                className="flex items-center space-x-2 hover:text-accent transition"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="hover:text-accent transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="hover:text-accent transition"
              >
                Register
              </button>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;