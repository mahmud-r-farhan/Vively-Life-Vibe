import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Loader2, X } from 'lucide-react';
import validator from 'validator';

const formSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters.')
    .max(30, 'Username cannot exceed 30 characters.'),
  firstName: z.string().min(1, 'First name is required.').max(50, 'First name cannot exceed 50 characters.'),
  lastName: z.string().min(1, 'Last name is required.').max(50, 'Last name cannot exceed 50 characters.'),
  email: z.string().email('Invalid email address.'),
  password: z
    .string()
    .optional()
    .refine(
      (value) => !value || validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
      'Password must be at least 8 characters with one uppercase, one lowercase, one number, and one special character.'
    ),
  contact: z.string().optional().refine((value) => !value || validator.isMobilePhone(value, 'any'), {
    message: 'Invalid phone number.',
  }),
  bio: z.string().max(250, 'Bio must not exceed 250 characters.').optional(),
  profilePicture: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 3 * 1024 * 1024, {
      message: 'Image must be less than 3MB.',
    })
    .refine((file) => !file || ['image/jpeg', 'image/png', 'image/gif'].includes(file.type), {
      message: 'Only JPEG, PNG, or GIF images are allowed.',
    }),
});

function UserForm({ defaultValues, onSubmit, isEdit = false }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      contact: '',
      bio: '',
      profilePicture: null,
      ...defaultValues,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === 'profilePicture' && data[key]) {
          formData.append(key, data[key]);
        } else if (data[key] && (key !== 'password' || !isEdit)) {
          formData.append(key, data[key]);
        }
      });
      await onSubmit(formData);
      toast.success(isEdit ? 'User updated successfully.' : 'User created successfully.');
      form.reset();
      setPreviewUrl(null);
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred.';
      if (message.includes('Cloudinary')) {
        toast.error('Image upload failed. Please check file size and format.');
      } else {
        toast.error(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = () => {
    form.setValue('profilePicture', null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isEdit && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us about yourself..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={(e) => {
                        if (previewUrl) URL.revokeObjectURL(previewUrl);
                        const file = e.target.files[0];
                        field.onChange(file);
                        setPreviewUrl(file ? URL.createObjectURL(file) : null);
                      }}
                    />
                    {previewUrl && (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={handleRemoveImage}
                          aria-label="Remove profile picture"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
            {isEdit ? 'Update User' : 'Create User'}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}

export default UserForm;