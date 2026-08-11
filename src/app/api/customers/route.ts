import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { customerSchema } from '@/lib/validators';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const includeInactive = searchParams.get('includeInactive') === 'true';

    const where: any = {};

    if (!includeInactive) {
      where.isActive = true;
    }

    if (search) {
      where.OR = [
        { customerId: { contains: search } },
        { name: { contains: search } },
      ];
    }

    const customers = await prisma.customer.findMany({
      where,
      include: {
        _count: {
          select: { skus: true, rejections: true },
        },
      },
      orderBy: { customerId: 'asc' },
    });

    return NextResponse.json({ data: customers });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = customerSchema.parse(body);

    const existing = await prisma.customer.findUnique({
      where: { customerId: validated.customerId },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Customer ID '${validated.customerId}' already exists.` },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.create({
      data: validated,
    });

    return NextResponse.json({ data: customer }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || 'Failed to create customer' },
      { status: 500 }
    );
  }
}
