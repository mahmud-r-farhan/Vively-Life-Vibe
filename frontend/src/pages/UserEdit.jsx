import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../services/api';
import UserForm from '../components/UserForm';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/common/LoadingSpinner';

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getUserById(id);
      setUser(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load user.');
      navigate('/users');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateUser(id, data);
      toast.success('User updated successfully.');
      navigate('/users');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update user.';
      if (message.includes('Cloudinary')) {
        toast.error('Image upload failed. Please check file size and format.');
      } else {
        toast.error(message);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto mt-12"
    >
      <Card>
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm defaultValues={user} onSubmit={handleUpdate} isEdit={true} />
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default UserEdit;