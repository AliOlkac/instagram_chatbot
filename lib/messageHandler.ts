// messageHandler ana orchestrator
export async function handleIncomingMessage(event: any) {
  // IG Webhook dummy event yapısı: { sender: { id }, message: { text } }
  const userId = event.sender?.id || 'bilinmeyen';
  const text = event.message?.text || '';
  // İleride OpenAI ve state yönetimi ile birleşecek
  // Şimdilik cevabı örnekleştir
  const response = `[TEST MODE] ${userId} şunu yazdı: ${text}`;
  return { status: 'handled', response };
}
