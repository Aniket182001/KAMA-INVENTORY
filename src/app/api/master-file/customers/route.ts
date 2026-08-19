import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  customerMasterFileSchema,
  SKU_TYPE_1_NAME,
  SKU_TYPE_2_NAME,
} from '@/lib/validators';

// GET /api/master-file/customers - List or search records
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const searchCustId = searchParams.get('custId');

    if (searchCustId) {
      const trimmedCustId = searchCustId.trim().toUpperCase();
      const record = await prisma.customerMasterFile.findUnique({
        where: { custId: trimmedCustId },
      });

      if (!record) {
        return NextResponse.json(
          { success: false, error: `Record not found for CUST ID "${trimmedCustId}"` },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: record });
    }

    const records = await prisma.customerMasterFile.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: records });
  } catch (error: any) {
    console.error('Error fetching master file records:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch master file records' },
      { status: 500 }
    );
  }
}

// POST /api/master-file/customers - Create a new record with Fixed SKU types & Delivery Times
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = customerMasterFileSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path.join('.');
        fieldErrors[field] = issue.message;
      });
      return NextResponse.json(
        { success: false, error: 'Validation failed', fieldErrors },
        { status: 400 }
      );
    }

    const {
      id,
      custId,
      custName,
      skuId,
      deliveryTime1Days,
      deliveryTime2Days,
    } = result.data;

    // 1. Check if manual ID already exists in master.db
    const existingId = await prisma.customerMasterFile.findUnique({
      where: { id },
    });

    if (existingId) {
      return NextResponse.json(
        {
          success: false,
          error: `Record with ID "${id}" already exists. Please enter a unique ID.`,
          fieldErrors: { id: `ID "${id}" is already in use` },
        },
        { status: 409 }
      );
    }

    // 2. Check if CUST ID already exists in master.db to prevent duplicates
    const existingCustId = await prisma.customerMasterFile.findUnique({
      where: { custId },
    });

    if (existingCustId) {
      return NextResponse.json(
        {
          success: false,
          error: `Record with CUST ID "${custId}" already exists. CUST ID must be unique.`,
          fieldErrors: {
            custId: `CUST ID "${custId}" is already registered (assigned to record ID "${existingCustId.id}")`,
          },
        },
        { status: 409 }
      );
    }

    const parsedD1 =
      deliveryTime1Days !== undefined && deliveryTime1Days !== null && !isNaN(Number(deliveryTime1Days)) && Number(deliveryTime1Days) >= 1
        ? Number(deliveryTime1Days)
        : null;
    const parsedD2 =
      deliveryTime2Days !== undefined && deliveryTime2Days !== null && !isNaN(Number(deliveryTime2Days)) && Number(deliveryTime2Days) >= 1
        ? Number(deliveryTime2Days)
        : null;

    const registeredSkuType1 = parsedD1 ? SKU_TYPE_1_NAME : null;
    const registeredSkuType2 = parsedD2 ? SKU_TYPE_2_NAME : null;
    const primarySkuName = registeredSkuType1 || registeredSkuType2 || '';
    const primaryDeliveryTime = parsedD1 || parsedD2 || 0;

    const record = await prisma.customerMasterFile.create({
      data: {
        id,
        custId,
        custName,
        skuId,
        skuName: primarySkuName,
        deliveryTimeDays: primaryDeliveryTime,
        skuType1: registeredSkuType1,
        deliveryTime1Days: parsedD1,
        skuType2: registeredSkuType2,
        deliveryTime2Days: parsedD2,
      },
    });

    return NextResponse.json({ success: true, data: record }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating master file record:', error);

    // Handle SQLite unique constraint error if caught at DB level
    if (error?.code === 'P2002' || error?.message?.includes('UNIQUE constraint failed')) {
      return NextResponse.json(
        {
          success: false,
          error: 'A record with this ID or CUST ID already exists. CUST ID must be unique.',
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to create master file record' },
      { status: 500 }
    );
  }
}
