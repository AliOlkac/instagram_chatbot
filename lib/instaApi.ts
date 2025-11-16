// Instagram API DM gönderim fonksiyonu (test için mock)
import { getEnvVariable } from '../config/env';

const IG_TOKEN = getEnvVariable('INSTAGRAM_API_TOKEN');
const IG_ENDPOINT = 'https://graph.facebook.com/v19.0/me/messages';

export async function sendInstagramDM(userId: string, message: string): Promise<boolean> {
  // --- MOCK ---
  // console.log(`[MOCK IG DM] userId: ${userId} mesaj: ${message}`);
  // return true;

  // --- GERÇEK API ---
  try {
    const response = await fetch(IG_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${IG_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient: { id: userId },
        message: { text: message }
      }),
    });
    if (!response.ok) {
      console.error('IG API error:', await response.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('Instagram API gönderiminde hata:', err);
    return false;
  }
}
