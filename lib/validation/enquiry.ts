// ===============================================================================
// JaaGee Scientific - Enquiry Form Zod Validation Schema
// File: C:\xampp\htdocs\jaagee\lib\validation\enquiry.ts
// ===============================================================================

import { z } from 'zod'

export const EnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name cannot exceed 100 characters'),
  company: z
    .string()
    .trim()
    .min(2, 'Company name is required')
    .max(150, 'Company name cannot exceed 150 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email cannot exceed 255 characters'),
  phone: z
    .string()
    .trim()
    .max(50, 'Phone number cannot exceed 50 characters')
    .optional()
    .or(z.literal('')),
  product_requirement: z
    .string()
    .trim()
    .min(2, 'Product or measurement requirement is required')
    .max(200, 'Requirement cannot exceed 200 characters'),
  message: z
    .string()
    .trim()
    .min(10, 'Please enter a message of at least 10 characters')
    .max(3000, 'Message cannot exceed 3000 characters'),
  // Honeypot field for spam prevention (must remain empty)
  website_hp: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
})

export type EnquiryInput = z.infer<typeof EnquirySchema>
