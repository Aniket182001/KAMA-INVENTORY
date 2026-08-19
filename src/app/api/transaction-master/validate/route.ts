import { NextRequest, NextResponse } from 'next/server';
import {
  parseUploadedFileBuffer,
  validateAndProcessTransactions,
  RawTransactionRow,
} from '@/lib/transaction-engine';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let rawRows: RawTransactionRow[] = [];
    let fileName = 'Uploaded_Dataset.csv';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json(
          { error: 'No file uploaded. Please choose a CSV or Excel file.' },
          { status: 400 }
        );
      }

      fileName = file.name;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      rawRows = parseUploadedFileBuffer(buffer);
    } else {
      const body = await request.json();
      rawRows = body.rows || [];
      if (body.fileName) fileName = body.fileName;
    }

    if (rawRows.length === 0) {
      return NextResponse.json(
        { error: 'The uploaded file is empty or could not be parsed.' },
        { status: 400 }
      );
    }

    const validationResult = await validateAndProcessTransactions(rawRows);

    return NextResponse.json({
      fileName,
      ...validationResult,
    });
  } catch (error: any) {
    console.error('Transaction validation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process and validate transaction dataset' },
      { status: 500 }
    );
  }
}
