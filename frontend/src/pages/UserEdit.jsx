import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../services/api';
import UserForm from '../components/UserForm';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await getUserById(id);
      setUser(response.data);
    } catch (error) {
      toast.error('Failed to load user.');
      navigate('/users');
    }
  };

  const handleUpdate = async (data) => {
    await updateUser(id, data);
    navigate('/users');
  };

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