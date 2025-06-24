import { useEffect, useState } from 'react';
import { getUsers, createUser } from '../services/api';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import UserCard from '../components/UserCard';
import UserForm from '../components/UserForm';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to load users.');
    }
  };

  const handleCreateUser = async (data) => {
    try {
      await createUser(data);
      fetchUsers();
      setOpen(false);
      toast.success('User created successfully!');
    } catch (error) {
      toast.error('Failed to create user.');
    }
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-4"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle size={20} className="mr-2" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <UserForm onSubmit={handleCreateUser} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user._id} user={user} onDelete={handleDelete} />
        ))}
      </div>
    </motion.div>
  );
}

export default Users;
