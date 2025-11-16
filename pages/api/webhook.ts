import type { NextApiRequest, NextApiResponse } from 'next';
import { handleIncomingMessage } from '../../lib/messageHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const event = req.body;
    // IG webhook için tipik JSON örneğini kontrol et
    if (!event || !event.sender || !event.message) {
      console.log('Invalid payload:', event);
      return res.status(400).json({ error: 'Geçersiz payload' });
    }

    // messageHandler ile dummy işleme
    const response = await handleIncomingMessage(event);
    console.log('Message handler sonucu:', response);
    return res.status(200).json({ status: 'ok', handled: response });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}
