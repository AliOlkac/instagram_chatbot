import { generateReply } from './openaiClient';
import { systemPrompt } from '../prompts/systemPrompt';

export async function handleIncomingMessage(event: any) {
  const userId = event.sender?.id || 'bilinmeyen';
  const text = event.message?.text || '';
  // Mesajlar prompt formatında hazırlanır
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: text }
  ];
  // OpenAI'den yanıt al
  const response = await generateReply(messages);
  return { status: 'handled', response };
}
