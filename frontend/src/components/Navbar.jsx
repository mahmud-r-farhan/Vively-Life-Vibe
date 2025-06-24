import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Menu, LogOut, User, Home, Users } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-card shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          DevPlus.fun
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="flex items-center hover:text-primary">
            <Home className="mr-1" size={20} /> Home
          </Link>
          {user && (
            <Link to="/users" className="flex items-center hover:text-primary">
              <Users className="mr-1" size={20} /> Users
            </Link>
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.profilePicture} alt={user.username} />
                  <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2" size={16} /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center">
                  <LogOut className="mr-2" size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
        <Button variant="ghost" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </Button>
      </div>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="md:hidden bg-card px-4 py-2"
        >
          <Link to="/" className="block py-2 hover:text-primary" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          {user && (
            <Link to="/users" className="block py-2 hover:text-primary" onClick={() => setIsOpen(false)}>
              Users
            </Link>
          )}
          {user ? (
            <>
              <Link to="/profile" className="block py-2 hover:text-primary" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
              <button onClick={handleLogout} className="block py-2 hover:text-primary w-full text-left">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 hover:text-primary" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="block py-2 hover:text-primary" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;