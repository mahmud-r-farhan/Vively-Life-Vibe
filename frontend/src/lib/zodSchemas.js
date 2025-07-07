import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  contact: z.string().optional(),
  bio: z.string().max(250).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});