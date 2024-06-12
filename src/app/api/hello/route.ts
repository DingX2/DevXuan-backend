import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse> => {
    return new NextResponse('Hello from Next.js!');
};
