import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const cors = Cors({
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
    origin: 'http://localhost:5173',
});

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: (req: NextApiRequest, res: NextApiResponse, next: (err?: Error) => void) => void,
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: unknown) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

const posts: { id: number; title: string; subtitle: string; content: string; writeDate: string; image?: string }[] = [];
let currentId = 1;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, cors);

    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            if (id) {
                const foundPost = posts.find((p) => p.id === parseInt(id as string, 10));
                if (foundPost) {
                    return res.status(200).json(foundPost);
                }
                return res.status(404).json({ message: 'Post not found' });
            }
            return res.status(200).json(posts);

        case 'POST': {
            const { title, subtitle, content, image } = req.body;
            if (!title || !subtitle || !content) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            const writeDate = new Date().toISOString();
            const newPost = { id: (currentId += 1), title, subtitle, content, writeDate, image };
            posts.push(newPost);
            return res.status(201).json(newPost);
        }

        case 'PUT':
            if (id) {
                const postIndex = posts.findIndex((post) => post.id === parseInt(id as string, 10));
                if (postIndex !== -1) {
                    const updatedPost = { ...posts[postIndex], ...req.body };
                    posts[postIndex] = updatedPost;
                    return res.status(200).json(updatedPost);
                }
                return res.status(404).json({ message: 'Post not found' });
            }
            return res.status(400).json({ message: 'ID is required for updating a post' });

        case 'DELETE':
            if (id) {
                const postIndex = posts.findIndex((post) => post.id === parseInt(id as string, 10));
                if (postIndex !== -1) {
                    posts.splice(postIndex, 1);
                    return res.status(204).end();
                }
                return res.status(404).json({ message: 'Post not found' });
            }
            return res.status(400).json({ message: 'ID is required for deleting a post' });

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
