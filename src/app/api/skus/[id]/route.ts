import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { skuSchema } from '@/lib/validators';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sku = await prisma.sku.findUnique({
      where: { id },
      include: {
        customer: true,
        processes: {
          include: { process: true },
          orderBy: { sequence: 'asc' },
        },
        rejections: {
          orderBy: { rejectionDate: 'desc' },
        },
      },
    });

    if (!sku) {
      return NextResponse.json({ error: 'SKU not found' }, { status: 404 });
    }

    return NextResponse.json({ data: sku });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch SKU' },
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
    const validated = skuSchema.parse(body);

    const existing = await prisma.sku.findFirst({
      where: {
        skuCode: validated.skuCode,
        NOT: { id },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: `SKU Code '${validated.skuCode}' is in use by another SKU.` },
        { status: 400 }
      );
    }

    const updated = await prisma.sku.update({
      where: { id },
      data: validated,
      include: { customer: true },
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
      { error: error.message || 'Failed to update SKU' },
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
    const current = await prisma.sku.findUnique({ where: { id } });

    if (!current) {
      return NextResponse.json({ error: 'SKU not found' }, { status: 404 });
    }

    const updated = await prisma.sku.update({
      where: { id },
      data: { isActive: !current.isActive },
    });

    return NextResponse.json({
      data: updated,
      message: `SKU ${updated.isActive ? 'activated' : 'deactivated'} successfully`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to toggle SKU status' },
      { status: 500 }
    );
  }
}
