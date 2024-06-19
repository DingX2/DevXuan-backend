import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse> => {
    return NextResponse.json({ message: 'Hello from Next.js!' });
};
