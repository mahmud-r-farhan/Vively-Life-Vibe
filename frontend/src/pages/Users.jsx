import { useEffect, useState } from 'react';
import { getUsers, createUser } from '../services/api';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import UserCard from '../components/UserCard';
import UserForm from '../components/UserForm';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 9;

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers(page, usersPerPage);
      setUsers(response.data);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / usersPerPage) || 1);
    } catch (error) {
      toast.error('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (data) => {
    try {
      await createUser(data);
      fetchUsers();
      setOpen(false);
      toast.success('User created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user.');
    }
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <LoadingSpinner />;

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
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            aria-label="Previous page"
          >
            Previous
          </Button>
          {[...Array(totalPages).keys()].map((_, i) => (
            <Button
              key={i + 1}
              variant={page === i + 1 ? 'default' : 'outline'}
              onClick={() => handlePageChange(i + 1)}
              aria-label={`Page ${i + 1}`}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            aria-label="Next page"
          >
            Next
          </Button>
        </div>
      )}
    </motion.div>
  );
}

export default Users;