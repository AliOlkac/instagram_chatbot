
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Burada ileride Instagram DM API çağrısı olacak
  res.status(200).json({ message: 'sendMessage API is alive' });
}
