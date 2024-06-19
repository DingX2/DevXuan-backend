import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prismaClient';

export const GET = async (): Promise<NextResponse> => {
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { title, subtitle, content, image } = await request.json();
        if (!title || !content) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        const newPost = await prisma.post.create({
            data: {
                title,
                subtitle,
                content,
                image,
            },
        });
        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
};
