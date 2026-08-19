// ==============================================
// KAMA Master File System - Validation Schemas
// ==============================================
import { z } from 'zod';

// CUST ID Regex: Name(5 chars) - Country(3 chars) - City(4 chars) - Location(4 chars)
export const CUST_ID_REGEX = /^[A-Za-z0-9]{5}-[A-Za-z0-9]{3}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;

// Auto-hyphenation formatter for CUST ID input
export function formatCustIdInput(raw: string): string {
  const clean = raw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 16);
  if (clean.length <= 5) {
    return clean;
  } else if (clean.length <= 8) {
    return `${clean.slice(0, 5)}-${clean.slice(5)}`;
  } else if (clean.length <= 12) {
    return `${clean.slice(0, 5)}-${clean.slice(5, 8)}-${clean.slice(8)}`;
  } else {
    return `${clean.slice(0, 5)}-${clean.slice(5, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}`;
  }
}

// Fixed SKU Types for Customer Master File
export const SKU_TYPE_1_NAME = 'Necklace/ Bracelate';
export const SKU_TYPE_2_NAME = 'Ring/ Pendent/ Earing';

export const SKU_NAME_OPTIONS = [
  'Necklace/ Bracelate',
  'Ring/ Pendent/ Earing',
] as const;

export const SKU_TYPE_OPTIONS = SKU_NAME_OPTIONS;

// ---- Customer Master File Validation Schema ----
export const customerMasterFileSchema = z
  .object({
    id: z
      .string()
      .trim()
      .min(1, 'ID is required')
      .max(50, 'ID must not exceed 50 characters'),
    custId: z
      .string()
      .trim()
      .toUpperCase()
      .regex(
        CUST_ID_REGEX,
        'CUST ID must follow format: Name(5 chars)-Country(3 chars)-City(4 chars)-Location(4 chars), e.g. MALAB-IND-PUNE-PIMP'
      ),
    custName: z
      .string()
      .trim()
      .min(1, 'Customer Name is required')
      .max(100, 'Customer Name must not exceed 100 characters'),
    skuId: z
      .string()
      .trim()
      .min(1, 'SKU ID is required')
      .max(50, 'SKU ID must not exceed 50 characters'),
    skuType1: z.string().optional().nullable(),
    deliveryTime1Days: z.coerce
      .number()
      .int('Delivery Time 1 must be a whole number of days')
      .positive('Delivery Time 1 must be at least 1 day')
      .optional()
      .nullable(),
    skuType2: z.string().optional().nullable(),
    deliveryTime2Days: z.coerce
      .number()
      .int('Delivery Time 2 must be a whole number of days')
      .positive('Delivery Time 2 must be at least 1 day')
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      const hasD1 =
        data.deliveryTime1Days !== undefined &&
        data.deliveryTime1Days !== null &&
        !isNaN(Number(data.deliveryTime1Days)) &&
        Number(data.deliveryTime1Days) >= 1;
      const hasD2 =
        data.deliveryTime2Days !== undefined &&
        data.deliveryTime2Days !== null &&
        !isNaN(Number(data.deliveryTime2Days)) &&
        Number(data.deliveryTime2Days) >= 1;
      return hasD1 || hasD2;
    },
    {
      message:
        'Please enter Delivery Time for at least one SKU Type (Necklace/ Bracelate or Ring/ Pendent/ Earing)',
      path: ['deliveryTime1Days'],
    }
  );

export type CustomerMasterFileInput = z.infer<typeof customerMasterFileSchema>;

// ---- Customer Master File Update Schema ----
export const customerMasterFileUpdateSchema = z
  .object({
    custName: z
      .string()
      .trim()
      .min(1, 'Customer Name is required')
      .max(100, 'Customer Name must not exceed 100 characters'),
    skuId: z
      .string()
      .trim()
      .min(1, 'SKU ID is required')
      .max(50, 'SKU ID must not exceed 50 characters'),
    skuType1: z.string().optional().nullable(),
    deliveryTime1Days: z.coerce
      .number()
      .int('Delivery Time 1 must be a whole number of days')
      .positive('Delivery Time 1 must be at least 1 day')
      .optional()
      .nullable(),
    skuType2: z.string().optional().nullable(),
    deliveryTime2Days: z.coerce
      .number()
      .int('Delivery Time 2 must be a whole number of days')
      .positive('Delivery Time 2 must be at least 1 day')
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      const hasD1 =
        data.deliveryTime1Days !== undefined &&
        data.deliveryTime1Days !== null &&
        !isNaN(Number(data.deliveryTime1Days)) &&
        Number(data.deliveryTime1Days) >= 1;
      const hasD2 =
        data.deliveryTime2Days !== undefined &&
        data.deliveryTime2Days !== null &&
        !isNaN(Number(data.deliveryTime2Days)) &&
        Number(data.deliveryTime2Days) >= 1;
      return hasD1 || hasD2;
    },
    {
      message:
        'Please enter Delivery Time for at least one SKU Type (Necklace/ Bracelate or Ring/ Pendent/ Earing)',
      path: ['deliveryTime1Days'],
    }
  );

export type CustomerMasterFileUpdateInput = z.infer<typeof customerMasterFileUpdateSchema>;

// ==============================================
// PROCESS MASTER FILE CONSTANTS & SCHEMAS
// ==============================================

// 29 Fixed Manufacturing Processes (exact numbering and order)
export const PROCESS_LIST = [
  { code: '01', name: 'WAXINJET', label: '01 - WAXINJET' },
  { code: '02', name: 'FKIT', label: '02 - FKIT' },
  { code: '03', name: 'WSFSK', label: '03 - WSFSK' },
  { code: '04', name: 'WSET', label: '04 - WSET' },
  { code: '05', name: 'WAXTREE', label: '05 - WAXTREE' },
  { code: '06', name: 'CASTQC', label: '06 - CASTQC' },
  { code: '07', name: 'CASTING', label: '07 - CASTING' },
  { code: '08', name: 'SINTER', label: '08 - SINTER' },
  { code: '09', name: 'LETHING', label: '09 - LETHING' },
  { code: '10', name: 'CNCMACH', label: '10 - CNCMACH' },
  { code: '11', name: 'CNCBLANK', label: '11 - CNCBLANK' },
  { code: '12', name: 'GRINDING', label: '12 - GRINDING' },
  { code: '13', name: 'BUFFING', label: '13 - BUFFING' },
  { code: '14', name: 'SLD', label: '14 - SLD' },
  { code: '15', name: 'OTEC', label: '15 - OTEC' },
  { code: '16', name: 'HISPANA', label: '16 - HISPANA' },
  { code: '17', name: 'WSFIN', label: '17 - WSFIN' },
  { code: '18', name: 'PRP', label: '18 - PRP' },
  { code: '19', name: 'FSK', label: '19 - FSK' },
  { code: '20', name: 'FSLD', label: '20 - FSLD' },
  { code: '21', name: 'MSET', label: '21 - MSET' },
  { code: '22', name: 'POL', label: '22 - POL' },
  { code: '23', name: 'SYTC', label: '23 - SYTC' },
  { code: '24', name: 'RHODIUM', label: '24 - RHODIUM' },
  { code: '25', name: 'FINALQC', label: '25 - FINALQC' },
  { code: '26', name: 'CERT', label: '26 - CERT' },
  { code: '27', name: 'CERTCARD', label: '27 - CERTCARD' },
  { code: '28', name: 'CERTQC', label: '28 - CERTQC' },
  { code: '29', name: 'RFD', label: '29 - RFD' },
] as const;

// SKU Type Options for Process Master File
export const PROCESS_SKU_TYPE_OPTIONS = [
  'Ring / Pendant / Earing',
  'Necklace/ Bracelate',
  'Silver',
  'Findings',
] as const;

export const processMasterFileSchema = z.object({
  custId: z.string().trim().min(1, 'CUST ID is required'),
  skuType: z.enum(PROCESS_SKU_TYPE_OPTIONS, {
    message: 'Please select a valid SKU Type',
  }),
  processes: z
    .array(z.string())
    .min(1, 'Please select at least one manufacturing process'),
  cycleTimes: z.record(z.string(), z.union([z.number(), z.string(), z.null()])),
  totalCycleTime: z.number().optional().default(0),
});

export type ProcessMasterFileInput = z.infer<typeof processMasterFileSchema>;

export const processMasterFileUpdateSchema = z.object({
  skuType: z.enum(PROCESS_SKU_TYPE_OPTIONS, {
    message: 'Please select a valid SKU Type',
  }),
  processes: z
    .array(z.string())
    .min(1, 'Please select at least one manufacturing process'),
  cycleTimes: z.record(z.string(), z.union([z.number(), z.string(), z.null()])),
  totalCycleTime: z.number().optional().default(0),
});

export type ProcessMasterFileUpdateInput = z.infer<typeof processMasterFileUpdateSchema>;

// ---- Legacy Schemas (Preserved for compatibility) ----
export const customerSchema = z.object({
  customerId: z.string().trim().min(1, 'Customer ID is required'),
  name: z.string().trim().min(1, 'Customer name is required'),
  notes: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
});

export const skuSchema = z.object({
  skuCode: z.string().trim().min(1, 'SKU code is required'),
  name: z.string().trim().min(1, 'SKU name is required'),
  category: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  customerId: z.string().min(1, 'Customer is required'),
  isActive: z.boolean().optional().default(true),
});

export const processSchema = z.object({
  processCode: z.string().trim().min(1, 'Process code is required'),
  processName: z.string().trim().min(1, 'Process name is required'),
  department: z.string().optional().nullable(),
  defaultSequence: z.number().int().optional().default(0),
  description: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
});

export const skuProcessRoutingSchema = z.object({
  processIds: z.array(z.string()).min(1, 'At least one process is required in routing'),
});

export const rejectionSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  skuId: z.string().optional().nullable(),
  productionOrderRef: z.string().optional().nullable(),
  rejectionCount: z.number().int().positive('Count must be at least 1'),
  rejectionReason: z.string().trim().min(1, 'Reason is required'),
  rejectionDate: z.string().min(1, 'Date is required'),
  notes: z.string().optional().nullable(),
});
