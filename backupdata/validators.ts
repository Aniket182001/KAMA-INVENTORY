import { z } from 'zod';

// ---- Customer Validators ----
export const customerSchema = z.object({
  customerId: z
    .string()
    .min(1, 'Customer ID is required')
    .max(50, 'Customer ID must be 50 characters or less')
    .trim(),
  name: z
    .string()
    .min(1, 'Customer Name is required')
    .max(100, 'Customer Name must be 100 characters or less')
    .trim(),
  notes: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
});

export type CustomerInput = z.infer<typeof customerSchema>;

// ---- Process Validators ----
export const processSchema = z.object({
  processCode: z
    .string()
    .min(1, 'Process Code is required')
    .max(50, 'Process Code must be 50 characters or less')
    .toUpperCase()
    .trim(),
  processName: z
    .string()
    .min(1, 'Process Name is required')
    .max(100, 'Process Name must be 100 characters or less')
    .trim(),
  department: z.string().optional().nullable(),
  defaultSequence: z.coerce.number().int().min(0).optional().default(0),
  description: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
});

export type ProcessInput = z.infer<typeof processSchema>;

// ---- SKU Validators ----
export const skuSchema = z.object({
  skuCode: z
    .string()
    .min(1, 'SKU Code is required')
    .max(50, 'SKU Code must be 50 characters or less')
    .trim(),
  name: z
    .string()
    .min(1, 'SKU Name is required')
    .max(100, 'SKU Name must be 100 characters or less')
    .trim(),
  category: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  customerId: z.string().min(1, 'Customer selection is required'),
  isActive: z.boolean().optional().default(true),
});

export type SkuInput = z.infer<typeof skuSchema>;

// ---- SKU Process Mapping Validator ----
export const skuProcessRoutingSchema = z.object({
  processIds: z.array(z.string()).min(0),
});

export type SkuProcessRoutingInput = z.infer<typeof skuProcessRoutingSchema>;

// ---- Rejection Log Validators ----
export const rejectionSchema = z.object({
  customerId: z.string().min(1, 'Customer selection is required'),
  skuId: z.string().optional().nullable(),
  productionOrderRef: z.string().optional().nullable(),
  rejectionCount: z.coerce.number().int().positive('Rejection count must be a positive integer'),
  rejectionReason: z.string().min(1, 'Rejection reason is required').trim(),
  rejectionDate: z.string().min(1, 'Rejection date is required'),
  notes: z.string().optional().nullable(),
});

export type RejectionInput = z.infer<typeof rejectionSchema>;
