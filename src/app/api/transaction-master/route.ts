import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uploadBatchId = searchParams.get('uploadBatchId') || searchParams.get('batchId');

    if (uploadBatchId) {
      const batch = await prisma.transactionUploadBatch.findUnique({
        where: { id: uploadBatchId },
        include: {
          transactions: true,
          poSummaries: true,
        },
      });

      if (!batch) {
        return NextResponse.json(
          { error: 'Transaction upload batch not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ data: batch });
    }

    // List all upload batches
    const batches = await prisma.transactionUploadBatch.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        _count: {
          select: {
            transactions: true,
            poSummaries: true,
          },
        },
      },
    });

    return NextResponse.json({ data: batches });
  } catch (error: any) {
    console.error('List transactions error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to list transactions' },
      { status: 500 }
    );
  }
}
