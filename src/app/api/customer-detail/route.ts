import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Add a GET handler for completeness
export async function GET(request: Request) {
  try {

    const url = new URL(request.url);
    const phoneNumber = url.searchParams.get('phoneNumber');

    if (!phoneNumber) {
        return NextResponse.json(
          { message: 'Error: 전화번호 입력해야 합니다.' }
        );
    }

    if (typeof phoneNumber !== 'string') {
        return NextResponse.json(
            { message: 'Error: 잘못된 입력된 번호입니다.' } 
          );
      }

    if (!/^010\d{8}$/.test(phoneNumber)) {
        return NextResponse.json(
          { message: 'Error: 핸드폰 번호는 010으로 시작하는 11자리여야 합니다.' } 
        );
    }

    const customer = await prisma.customer.findUnique({
        where: { phoneNumber },
        include: {
          coupons: true,
        },
      });
  
      if (!customer) {
        return NextResponse.json(
            { message: 'Error: 고객을 찾을 수 없습니다.' } 
          );
      }
  
      const response = {
        stamps: customer.stamps,
        coupons: customer.coupons.map(c => ({
          id: c.id,
          createdAt: c.createdAt,
          expiresAt: c.expiresAt,
        })),
        createdAt: customer.createdAt,
      };

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error: Internal Server Error' },
      { status: 500 }
    );
  }
}

// Handle PUT requests
export async function PUT() {
  return NextResponse.json({ message: 'Customer-detail API endpoint - use GET method only.' });
}

// Handle DELETE requests
export async function DELETE() {
  return NextResponse.json({ message: 'Customer-detail API endpoint - use GET method only.' });
}

// Handle POST requests
export async function POST(request: Request) {
    return NextResponse.json({ message: 'Customer-detail API endpoint - use GET method only.' });
}