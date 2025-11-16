
import type { NextApiRequest, NextApiResponse } from 'next'
import { sendInstagramDM } from '../../lib/instaApi'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  try {
    const { userId, message } = req.body
    if (!userId || !message) {
      return res.status(400).json({ error: 'userId ve message zorunlu' })
    }
    const result = await sendInstagramDM(userId, message)
    res.status(200).json({ success: result })
  } catch (err) {
    console.error('sendMessage hata:', err)
    res.status(500).json({ error: 'Sunucu hatası' })
  }
}
