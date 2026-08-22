// src/utils/validationSchemas.js
import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name is too long')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone number can only contain digits'),
  
  addressLine1: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address is too long'),
  
  addressLine2: z
    .string()
    .optional()
    .nullable(),
  
  city: z
    .string()
    .min(2, 'City must be at least 2 characters'),
  
  state: z
    .string()
    .min(2, 'State/Province must be at least 2 characters'),
  
  zipCode: z
    .string()
    .min(5, 'ZIP code must be at least 5 characters')
    .regex(/^\d+$/, 'ZIP code can only contain digits'),
  
  country: z
    .string()
    .min(1, 'Please select a country'),
  
  cardNumber: z
    .string()
    // ❌ Remove this: .length(16, 'Card number must be exactly 16 digits')
    // ✅ Replace with this:
    .transform((val) => val.replace(/\s/g, '')) // Remove all spaces
    .refine((val) => /^\d{16}$/.test(val), 'Card number must be exactly 16 digits'),
  
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Please use MM/YY format'),
  
  cvv: z
    .string()
    .length(3, 'CVV must be exactly 3 digits')
    .regex(/^\d+$/, 'CVV can only contain digits'),
  
  agreeToTerms: z
    .boolean()
    .refine(val => val === true, 'You must agree to the terms and conditions'),
});

// ❌ REMOVE THIS LINE - it's TypeScript only
// export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const defaultCheckoutValues = {
  fullName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'US',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  agreeToTerms: false,
};