import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/UsersPage';
import EditUserPage from './pages/EditUserPage';
import Header from './components/common/Header';
import { motion } from 'framer-motion';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-4"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/edit/:id" element={<EditUserPage />} />
          </Routes>
        </motion.main>
      </div>
    </QueryClientProvider>
  );
}

export default App;