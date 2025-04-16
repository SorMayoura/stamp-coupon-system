import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Add a GET handler for completeness
export async function GET() {
  return NextResponse.json(
    { message: 'Stamp API endpoint - use POST to add stamps' }
  );
}

// Handle PUT requests
export async function PUT() {
  return NextResponse.json({ message: 'Stamp API endpoint - use POST to add stamps' });
}

// Handle DELETE requests
export async function DELETE() {
  return NextResponse.json({ message: 'Stamp API endpoint - use POST to add stamps' });
}

// Handle POST requests
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber } = body;

    // Now you can use phoneNumber
    if (!phoneNumber) {
      return NextResponse.json(
        { message: 'Error: 전화번호 입력해야 합니다.' }
      );
    }

    if (!/^010\d{8}$/.test(phoneNumber)) {
      return NextResponse.json(
        { message: 'Error: 핸드폰 번호는 010으로 시작하는 11자리여야 합니다.' }
      );
    }

    const MAX_STAMPS = parseInt(process.env.MAX_STAMPS || '10');
    const COUPON_EXPIRY_DAYS = parseInt(process.env.COUPON_EXPIRY_DAYS || '30');

    let customer = await prisma.customer.findUnique({ where: { phoneNumber } });

    if (!customer) {
      customer = await prisma.customer.create({ data: { phoneNumber } });
    }

    const newStampCount = customer.stamps + 1;

    if (newStampCount >= MAX_STAMPS) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + COUPON_EXPIRY_DAYS);

      await prisma.$transaction([
        prisma.coupon.create({
          data: {
            customerId: customer.id,
            expiresAt,
          },
        }),
        prisma.customer.update({
          where: { id: customer.id },
          data: { stamps: 0 },
        }),
      ]);
    } else {
      await prisma.customer.update({
        where: { id: customer.id },
        data: { stamps: newStampCount },
      });
    }
    
    return NextResponse.json({ message: 'Stamp added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}