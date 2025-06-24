import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { deleteUser } from '../services/api';

function UserCard({ user, onDelete }) {
  const handleDelete = async () => {
    try {
      await deleteUser(user._id);
      toast.success('User deleted successfully.');
      onDelete(user._id);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar>
            <AvatarImage src={user.profilePicture} alt={user.username} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle>{user.username}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p className="text-muted-foreground">{user.email}</p>
          {user.bio && <p className="mt-2 italic">{user.bio}</p>}
          <div className="mt-4 flex space-x-2">
            <Link to={`/users/edit/${user._id}`}>
              <Button variant="outline" size="icon">
                <Edit size={16} />
              </Button>
            </Link>
            <Button variant="destructive" size="icon" onClick={handleDelete}>
              <Trash2 size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default UserCard;