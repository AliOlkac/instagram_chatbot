# System Patterns: Mimarî ve Teknik Akışlar

## Mimari 
- Next.js (Pages Router, Vercel deploy odaklı)
- Instagram Webhook API → Bot API endpoint
- OpenAI Chat API → Mesaj üretimi
- State, memory store veya KV ile yönetilir

## Ana Modüller ve Akış
- /pages/api/webhook.ts → IG’den mesajı alır
- /lib/messageHandler.ts → Mesaj parse, state, prompt oluşturma
- /lib/stateManager.ts → Kullanıcı state
- /lib/openaiClient.ts → OpenAI API
- /lib/instaApi.ts → Instagram API çağrıları

## Akış
1. DM → IG Webhook → /api/webhook
2. messageHandler, user ve mesajı çıkarır
3. Gerekirse stateManager ile hangi aşamada olduğunu bakar
4. Gerekli prompt oluşturulur, OpenAI’ye iletilir
5. Cevap dönülür, Instagram DM olarak gönderilir
