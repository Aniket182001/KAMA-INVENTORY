import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { processSchema } from '@/lib/validators';

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
        { processCode: { contains: search } },
        { processName: { contains: search } },
        { department: { contains: search } },
      ];
    }

    const processes = await prisma.process.findMany({
      where,
      orderBy: [
        { defaultSequence: 'asc' },
        { processCode: 'asc' },
      ],
    });

    return NextResponse.json({ data: processes });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch processes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = processSchema.parse(body);

    // Check code uniqueness
    const existing = await prisma.process.findUnique({
      where: { processCode: validated.processCode },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Process code '${validated.processCode}' already exists.` },
        { status: 400 }
      );
    }

    const newProcess = await prisma.process.create({
      data: validated,
    });

    return NextResponse.json({ data: newProcess }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || 'Failed to create process' },
      { status: 500 }
    );
  }
}
