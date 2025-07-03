import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

function Home() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  const sanitizedUsername = user ? DOMPurify.sanitize(user.username) : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to DevPlus.fun</h1>
      <p className="text-lg text-muted-foreground mb-6">
        {user ? `Hello, ${sanitizedUsername}! Explore your profile or manage users.` : 'Join our community to connect and collaborate.'}
      </p>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/profile">
              <Button>View Profile</Button>
            </Link>
            <Link to="/users">
              <Button variant="outline">Manage Users</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Log In</Button>
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default Home;