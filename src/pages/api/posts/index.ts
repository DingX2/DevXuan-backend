import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prisma';
import cors from '@/utils/cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);

    try {
        if (req.method === 'GET') {
            const posts = await prisma.post.findMany();
            return res.status(200).json(posts);
        }
        if (req.method === 'POST') {
            const { title, subtitle, content, image } = req.body;

            if (!title || !subtitle || !content) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            console.log('Received data:', { title, subtitle, content, image });

            const newPost = await prisma.post.create({
                data: {
                    title,
                    subtitle,
                    content,
                    writeDate: new Date(),
                    image,
                },
            });

            console.log('Created post:', newPost);

            return res.status(201).json(newPost);
        }
        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Error in API handler:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
