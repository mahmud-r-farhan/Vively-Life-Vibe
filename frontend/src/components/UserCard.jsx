import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { deleteUser } from '../services/api';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import DOMPurify from 'dompurify';
import { cld } from '../utils/cloudinary';
import { fill } from '@cloudinary/url-gen/actions/resize';

function UserCard({ user, onDelete }) {
  const sanitizedUsername = DOMPurify.sanitize(user.username);
  const sanitizedFullName = DOMPurify.sanitize(`${user.firstName} ${user.lastName}`);
  const sanitizedEmail = DOMPurify.sanitize(user.email);
  const sanitizedBio = user.bio ? DOMPurify.sanitize(user.bio) : '';
  const profilePictureUrl = user.profilePicture
    ? cld.image(user.profilePicture.split('/').pop().split('.')[0]).resize(fill().width(48).height(48)).toURL()
    : 'https://placehold.co/48x48/EFEFEF/AAAAAA?text=No+Image';

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
            <AvatarImage src={profilePictureUrl} alt={sanitizedUsername} />
            <AvatarFallback>{sanitizedUsername[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle>{sanitizedUsername}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{sanitizedFullName}</p>
          <p className="text-muted-foreground">{sanitizedEmail}</p>
          {sanitizedBio && <p className="mt-2 italic">{sanitizedBio}</p>}
          <div className="mt-4 flex space-x-2">
            <Link to={`/users/edit/${user._id}`}>
              <Button variant="outline" size="icon" aria-label={`Edit user ${sanitizedUsername}`}>
                <Edit size={16} />
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" aria-label={`Delete user ${sanitizedUsername}`}>
                  <Trash2 size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete the user "{sanitizedUsername}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default UserCard;