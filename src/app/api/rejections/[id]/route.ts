import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { rejectionSchema } from '@/lib/validators';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rejection = await prisma.rejection.findUnique({
      where: { id },
      include: {
        customer: true,
        sku: true,
      },
    });

    if (!rejection) {
      return NextResponse.json({ error: 'Rejection record not found' }, { status: 404 });
    }

    return NextResponse.json({ data: rejection });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch rejection record' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = rejectionSchema.parse(body);

    const updated = await prisma.rejection.update({
      where: { id },
      data: {
        customerId: validated.customerId,
        skuId: validated.skuId || null,
        productionOrderRef: validated.productionOrderRef || null,
        rejectionCount: validated.rejectionCount,
        rejectionReason: validated.rejectionReason,
        rejectionDate: new Date(validated.rejectionDate),
        notes: validated.notes || null,
      },
      include: {
        customer: true,
        sku: true,
      },
    });

    return NextResponse.json({ data: updated });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || 'Failed to update rejection record' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.rejection.delete({ where: { id } });

    return NextResponse.json({ message: 'Rejection record deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete rejection record' },
      { status: 500 }
    );
  }
}
