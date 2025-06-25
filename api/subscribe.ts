// /api/subscribe.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { email } = req.body;
  // connect to db or mailing system

  return res.status(200).json({ message: 'Subscribed!', email });
}
