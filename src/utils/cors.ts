// utils/cors.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

function initMiddleware(
    middleware: (req: NextApiRequest, res: NextApiResponse, callback: (err?: unknown) => void) => void,
) {
    return (req: NextApiRequest, res: NextApiResponse) =>
        new Promise<void>((resolve, reject) => {
            middleware(req, res, (result: unknown) => {
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve();
            });
        });
}

export default initMiddleware(
    Cors({
        methods: ['GET', 'POST', 'OPTIONS'],
        origin: '*',
    }),
);
