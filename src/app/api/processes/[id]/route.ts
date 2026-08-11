import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { processSchema } from '@/lib/validators';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const processItem = await prisma.process.findUnique({
      where: { id },
      include: {
        skuProcesses: {
          include: {
            sku: {
              include: { customer: true },
            },
          },
        },
      },
    });

    if (!processItem) {
      return NextResponse.json({ error: 'Process not found' }, { status: 404 });
    }

    return NextResponse.json({ data: processItem });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch process' },
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
    const validated = processSchema.parse(body);

    const existing = await prisma.process.findFirst({
      where: {
        processCode: validated.processCode,
        NOT: { id },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Process code '${validated.processCode}' is in use by another process.` },
        { status: 400 }
      );
    }

    const updated = await prisma.process.update({
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
      { error: error.message || 'Failed to update process' },
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
    const current = await prisma.process.findUnique({ where: { id } });

    if (!current) {
      return NextResponse.json({ error: 'Process not found' }, { status: 404 });
    }

    // Soft delete toggle
    const updated = await prisma.process.update({
      where: { id },
      data: { isActive: !current.isActive },
    });

    return NextResponse.json({
      data: updated,
      message: `Process ${updated.isActive ? 'activated' : 'deactivated'} successfully`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to toggle process status' },
      { status: 500 }
    );
  }
}
