import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Users from './pages/Users';
import UserEdit from './pages/UserEdit';
import { motion } from 'framer-motion';
import ErrorBoundary from './components/common/ErrorBoundary';
import { Toaster } from 'sonner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Toaster richColors position="top-right" />
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-4"
        >
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <PrivateRoute>
                    <Users />
                  </PrivateRoute>
                }
              />
              <Route
                path="/users/edit/:id"
                element={
                  <PrivateRoute>
                    <UserEdit />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ErrorBoundary>
        </motion.main>
      </div>
    </AuthProvider>
  );
}

export default App;