import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { skuProcessRoutingSchema } from '@/lib/validators';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: skuId } = await params;

    const skuProcesses = await prisma.skuProcess.findMany({
      where: { skuId },
      include: { process: true },
      orderBy: { sequence: 'asc' },
    });

    return NextResponse.json({ data: skuProcesses });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch SKU processes' },
      { status: 500 }
    );
  }
}

// Bulk set process routing for a SKU
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: skuId } = await params;
    const body = await request.json();
    const { processIds } = skuProcessRoutingSchema.parse(body);

    // Prevent duplicates in incoming processIds
    const uniqueProcessIds = Array.from(new Set(processIds));

    // Transaction to replace process routing atomically
    await prisma.$transaction(async (tx) => {
      // Delete existing processes for this SKU
      await tx.skuProcess.deleteMany({
        where: { skuId },
      });

      // Insert new processes with sequence 1..N
      if (uniqueProcessIds.length > 0) {
        await tx.skuProcess.createMany({
          data: uniqueProcessIds.map((processId, index) => ({
            skuId,
            processId,
            sequence: index + 1,
          })),
        });
      }
    });

    // Return updated list
    const updated = await prisma.skuProcess.findMany({
      where: { skuId },
      include: { process: true },
      orderBy: { sequence: 'asc' },
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
      { error: error.message || 'Failed to update SKU process routing' },
      { status: 500 }
    );
  }
}
