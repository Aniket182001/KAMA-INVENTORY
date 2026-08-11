import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { rejectionSchema } from '@/lib/validators';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const customerId = searchParams.get('customerId') || '';
    const skuId = searchParams.get('skuId') || '';

    const where: any = {};

    if (customerId) where.customerId = customerId;
    if (skuId) where.skuId = skuId;

    if (search) {
      where.OR = [
        { rejectionReason: { contains: search } },
        { productionOrderRef: { contains: search } },
        { notes: { contains: search } },
        { customer: { name: { contains: search } } },
        { sku: { skuCode: { contains: search } } },
      ];
    }

    const rejections = await prisma.rejection.findMany({
      where,
      include: {
        customer: true,
        sku: true,
      },
      orderBy: { rejectionDate: 'desc' },
    });

    return NextResponse.json({ data: rejections });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch rejections' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = rejectionSchema.parse(body);

    const rejection = await prisma.rejection.create({
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

    return NextResponse.json({ data: rejection }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || 'Failed to create rejection record' },
      { status: 500 }
    );
  }
}
