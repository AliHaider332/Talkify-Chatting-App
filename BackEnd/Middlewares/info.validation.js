import { z } from 'zod';
import ErrorHandler from '../Utils/errorHandler.utils.js';

const userRegisterSchema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters'),
  gender: z.string(),
  username: z
    .string()
    .regex(/^[A-Za-z][A-Za-z0-9-]*$/, 'Only letters, numbers or dash allowed'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
const userLoginSchema = z.object({
  identity: z.string().refine(
    (val) => {
      // regex for username: starts with a letter, followed by letters, numbers, or dash
      const isUsername = /^[A-Za-z][A-Za-z0-9-]*$/.test(val);
      // regex for email
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      return isUsername || isEmail;
    },
    {
      message: 'Enter a valid username or email',
    }
  ),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const validateRegisterInfo = (req, res, next) => {
  try {
    const result = userRegisterSchema.safeParse(req.body); // ✅ FIX HERE
    if (!result.success) {
      throw new ErrorHandler(result.error.issues[0].message, 400);
    }
    req.user = result.data;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateLoginInfo = (req, res, next) => {
  try {
    const result = userLoginSchema.safeParse(req.body); // ✅ FIX HERE
    if (!result.success) {
      throw new ErrorHandler(result.error.issues[0].message, 400);
    }
    req.user = result.data;
    next();
  } catch (error) {
    next(error);
  }
};
