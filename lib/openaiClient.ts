import { getEnvVariable } from '../config/env';

const OPENAI_API_KEY = getEnvVariable('OPENAI_API_KEY');

// OpenAI GPT Chat completions ile yanıt üreten fonksiyon
type Message = { role: 'system' | 'user' | 'assistant'; content: string };

export async function generateReply(messages: Message[]): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      max_tokens: 250
    })
  });
  if (!response.ok) throw new Error('OpenAI yanıtı alınamadı');
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || '[asistan hatası: cevap alınamadı]';
}
