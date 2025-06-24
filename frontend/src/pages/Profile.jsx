import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Info } from 'lucide-react';

function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto mt-12"
    >
      <Card>
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.profilePicture} alt={user.username} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4">{user.username}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <User size={20} />
            <p>{user.firstName} {user.lastName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={20} />
            <p>{user.email}</p>
          </div>
          {user.contact && (
            <div className="flex items-center space-x-2">
              <Phone size={20} />
              <p>{user.contact}</p>
            </div>
          )}
          {user.bio && (
            <div className="flex items-start space-x-2">
              <Info size={20} />
              <p className="italic">{user.bio}</p>
            </div>
          )}
          <Separator />
          <p className="text-center text-muted-foreground">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Profile;