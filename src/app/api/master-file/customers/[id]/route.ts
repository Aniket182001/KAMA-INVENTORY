import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  customerMasterFileUpdateSchema,
  SKU_TYPE_1_NAME,
  SKU_TYPE_2_NAME,
} from '@/lib/validators';

// GET /api/master-file/customers/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const record = await prisma.customerMasterFile.findUnique({
      where: { id },
    });

    if (!record) {
      return NextResponse.json(
        { success: false, error: `Record with ID "${id}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: record });
  } catch (error: any) {
    console.error('Error fetching record by ID:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch record' },
      { status: 500 }
    );
  }
}

// PUT /api/master-file/customers/[id] - Update editable fields only
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const result = customerMasterFileUpdateSchema.safeParse(body);

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
      custName,
      skuId,
      deliveryTime1Days,
      deliveryTime2Days,
    } = result.data;

    // Check if record exists
    const existing = await prisma.customerMasterFile.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Record with ID "${id}" not found` },
        { status: 404 }
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
    const primarySkuName = registeredSkuType1 || registeredSkuType2 || existing.skuName || '';
    const primaryDeliveryTime = parsedD1 || parsedD2 || existing.deliveryTimeDays || 0;

    // Update ONLY editable fields (ID and CUST ID are preserved unchanged)
    const updated = await prisma.customerMasterFile.update({
      where: { id },
      data: {
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

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error updating master file record:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update record' },
      { status: 500 }
    );
  }
}

// DELETE /api/master-file/customers/[id] - Delete record from database
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.customerMasterFile.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Record with ID "${id}" not found` },
        { status: 404 }
      );
    }

    await prisma.customerMasterFile.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Record deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting master file record:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete record' },
      { status: 500 }
    );
  }
}
