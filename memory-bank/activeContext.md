# Aktif Bağlam

## Şu Anki Odak
- Memory Bank kuruldu
- Next.js scaffold ve temel endpointler hazır
- Webhook ve messageHandler canlı test ve parse OK
- OpenAI gerçek API entegrasyonu tamamlandı, webhook OpenAI yanıtı döner
- Instagram DM endpoint zinciri (sendMessage, instaApi.ts) mock ile aktif edildi

## Son Değişiklikler
- lib/instaApi.ts'de sendInstagramDM fonksiyonu mock ile test için loglama yapıyor
- pages/api/sendMessage.ts endpointi POST ile userId/message aldıktan sonra IG DM fonksiyonunu çağırıyor

## Hedeflenen Sonraki Adımlar
- /api/sendMessage endpointinin test edilmesi
- Sipariş toplama/stateful diyalog planı
- Gerçek IG DM apiye kod devri
