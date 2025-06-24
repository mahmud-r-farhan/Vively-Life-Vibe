import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

function Home() {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to DevPlus.fun</h1>
      <p className="text-lg text-muted-foreground mb-6">
        {user ? `Hello, ${user.username}! Explore your profile or manage users.` : 'Join our community to connect and collaborate.'}
      </p>
      {user ? (
        <div className="space-x-4">
          <Link to="/profile">
            <Button>View Profile</Button>
          </Link>
          <Link to="/users">
            <Button variant="outline">Manage Users</Button>
          </Link>
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/register">
            <Button>Sign Up</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Log In</Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
}

export default Home;