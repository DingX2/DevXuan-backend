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

const posts: { id: number; title: string; content: string }[] = [];
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
                    res.status(200).json(foundPost);
                } else {
                    res.status(404).json({ message: 'Post not found' });
                }
            } else {
                res.status(200).json(posts);
            }
            break;
        case 'POST': {
            const { title, content } = req.body;
            const newPost = { id: (currentId += 1), title, content };
            posts.push(newPost);
            res.status(201).json(newPost);
            break;
        }
        case 'PUT':
            if (id) {
                const postIndex = posts.findIndex((post) => post.id === parseInt(id as string, 10));
                if (postIndex !== -1) {
                    const updatedPost = { ...posts[postIndex], ...req.body };
                    posts[postIndex] = updatedPost;
                    res.status(200).json(updatedPost);
                } else {
                    res.status(404).json({ message: 'Post not found' });
                }
            } else {
                res.status(400).json({ message: 'ID is required for updating a post' });
            }
            break;
        case 'DELETE':
            if (id) {
                const postIndex = posts.findIndex((post) => post.id === parseInt(id as string, 10));
                if (postIndex !== -1) {
                    posts.splice(postIndex, 1);
                    res.status(204).end();
                } else {
                    res.status(404).json({ message: 'Post not found' });
                }
            } else {
                res.status(400).json({ message: 'ID is required for deleting a post' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
