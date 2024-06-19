import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
    origin: ['http://localhost:5173', 'https://devxuan.netlify.app'],
});

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: (req: NextApiRequest, res: NextApiResponse, next: (err?: Error) => void) => void,
) {
    return new Promise<void>((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve();
        });
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, cors);

    if (req.method === 'GET') {
        res.json({
            id: 1,
            title: 'Sample Blog Post',
            subtitle: 'Subtitle',
            content: 'Content',
            writeDate: '2023-01-01',
            image: 'image_url',
        });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
