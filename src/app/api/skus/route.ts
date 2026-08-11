import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { skuSchema } from '@/lib/validators';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const customerId = searchParams.get('customerId') || '';
    const includeInactive = searchParams.get('includeInactive') === 'true';

    const where: any = {};

    if (!includeInactive) {
      where.isActive = true;
    }

    if (customerId) {
      where.customerId = customerId;
    }

    if (search) {
      where.OR = [
        { skuCode: { contains: search } },
        { name: { contains: search } },
        { category: { contains: search } },
      ];
    }

    const skus = await prisma.sku.findMany({
      where,
      include: {
        customer: true,
        processes: {
          include: { process: true },
          orderBy: { sequence: 'asc' },
        },
      },
      orderBy: { skuCode: 'asc' },
    });

    return NextResponse.json({ data: skus });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch SKUs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = skuSchema.parse(body);

    const existing = await prisma.sku.findUnique({
      where: { skuCode: validated.skuCode },
    });

    if (existing) {
      return NextResponse.json(
        { error: `SKU Code '${validated.skuCode}' already exists.` },
        { status: 400 }
      );
    }

    const sku = await prisma.sku.create({
      data: validated,
      include: { customer: true },
    });

    return NextResponse.json({ data: sku }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || 'Failed to create SKU' },
      { status: 500 }
    );
  }
}
