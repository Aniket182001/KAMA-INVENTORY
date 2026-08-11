import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { customerSchema } from '@/lib/validators';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        skus: {
          include: {
            processes: {
              include: { process: true },
              orderBy: { sequence: 'asc' },
            },
          },
          orderBy: { skuCode: 'asc' },
        },
        rejections: {
          include: { sku: true },
          orderBy: { rejectionDate: 'desc' },
        },
      },
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({ data: customer });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch customer' },
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
    const validated = customerSchema.parse(body);

    const existing = await prisma.customer.findFirst({
      where: {
        customerId: validated.customerId,
        NOT: { id },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Customer ID '${validated.customerId}' is in use by another customer.` },
        { status: 400 }
      );
    }

    const updated = await prisma.customer.update({
      where: { id },
      data: validated,
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
      { error: error.message || 'Failed to update customer' },
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
    const current = await prisma.customer.findUnique({ where: { id } });

    if (!current) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const updated = await prisma.customer.update({
      where: { id },
      data: { isActive: !current.isActive },
    });

    return NextResponse.json({
      data: updated,
      message: `Customer ${updated.isActive ? 'activated' : 'deactivated'} successfully`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to toggle customer status' },
      { status: 500 }
    );
  }
}
