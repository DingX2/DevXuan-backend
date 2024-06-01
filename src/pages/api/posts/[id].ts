import { PrismaClient } from '@prisma/client';
import { type NextApiRequest, type NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id as string, 10) },
        });
        res.json(post);
    } else if (req.method === 'PUT') {
        const { title, content } = req.body;
        const post = await prisma.post.update({
            where: { id: parseInt(id as string, 10) },
            data: { title, content },
        });
        res.json(post);
    } else if (req.method === 'DELETE') {
        await prisma.post.delete({
            where: { id: parseInt(id as string, 10) },
        });
        res.json({ message: 'Post deleted' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
