import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Info } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DOMPurify from 'dompurify';
import { cld } from '../utils/cloudinary';
import { fill } from '@cloudinary/url-gen/actions/resize';

function Profile() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return null;

  const sanitizedUsername = DOMPurify.sanitize(user.username);
  const sanitizedFullName = DOMPurify.sanitize(`${user.firstName} ${user.lastName}`);
  const sanitizedEmail = DOMPurify.sanitize(user.email);
  const sanitizedContact = user.contact ? DOMPurify.sanitize(user.contact) : '';
  const sanitizedBio = user.bio ? DOMPurify.sanitize(user.bio) : '';
  const profilePictureUrl = user.profilePicture
    ? cld.image(user.profilePicture.split('/').pop().split('.')[0]).resize(fill().width(96).height(96)).toURL()
    : 'https://placehold.co/96x96/EFEFEF/AAAAAA?text=No+Image';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto mt-12"
    >
      <Card>
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profilePictureUrl} alt={sanitizedUsername} />
            <AvatarFallback>{sanitizedUsername[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4">{sanitizedUsername}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <User size={20} />
            <p>{sanitizedFullName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={20} />
            <p>{sanitizedEmail}</p>
          </div>
          {sanitizedContact && (
            <div className="flex items-center space-x-2">
              <Phone size={20} />
              <p>{sanitizedContact}</p>
            </div>
          )}
          {sanitizedBio && (
            <div className="flex items-start space-x-2">
              <Info size={20} />
              <p className="italic">{sanitizedBio}</p>
            </div>
          )}
          <Separator />
          {user.createdAt && (
            <p className="text-center text-muted-foreground">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Profile;