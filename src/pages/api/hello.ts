// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') return res.status(200).json({ name: 'John Doe' });
  if (req.method === 'POST') {
    // Save to database `req.body`
    return res.status(200).json(req.body);
  }

  return res.status(404);
}
