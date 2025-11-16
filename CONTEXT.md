# Project Plan: Instagram Sales Bot (Next.js + OpenAI + Vercel)

Bu dosya, geliştireceğimiz Instagram satış chatbot projesi için **tüm içerik, kapsam, kurallar, teknik detaylar, mimari, modüller, API akışları, dosya yapısı ve yol haritası** dahil olmak üzere tam bağlamı içerir.

---

# 🚀 1. PROJENİN AMACI

Instagram üzerinden kişiye özel çizgi film / animasyon hizmeti satıyorsun. Çok fazla DM geldiği için:

* Sık sorulara otomatik cevap veren,
* Senin tarzında konuşan,
* Sipariş için gerekli bilgileri toplayan,
* Ödeme aşamasına yönlendiren,
* İndirim / pazarlık / "önce video sonra ödeme" gibi durumları kurallara göre yöneten,
* Sen yokken 7/24 çalışan,

bir **Instagram otomatik satış botu** geliştiriyoruz.

Bu bot, **Next.js + Vercel** üzerinde çalışan bir backend (API routes) olacak. Gelen mesajları Instagram Webhook API üzerinden alıp OpenAI API'ye gönderecek ve kullanıcıya cevap verecek.

Hedef: Kurulumdan sonra senin tek yapman gereken **OpenAI API key ve Instagram API tokenlerini .env dosyasına yazmak**.

---

# 🧩 2. BOTUN KAPSAMI

Bot şunları yapacak:

### ✔️ Soru cevaplama

* Fiyat nedir?
* Teslim süresi?
* Ne şekilde teslim ediliyor?
* Kaç saniyelik video paketleri var?
* Revize nasıl oluyor?

### ✔️ Sipariş toplama

Müşteriden aşağıdaki bilgileri toplayacak:

* Çocuğun adı
* Yaşı
* Video süresi (30 sn / 60 sn vb.)
* Tema / konsept (prenses, süper kahraman vb.)
* Özel notlar
* Teslim şekli (Instagram / WhatsApp / E‑posta)
* Ödeme yöntemi

### ✔️ İş kurallarını uygulama

* **Ödeme almadan çalışmaya başlanmaz.**
* "Önce video gönderin sonra öderim" her zaman reddedilir.
* İndirim isteyenlere kibar ama net bir şekilde "şu an fiyatlar minimum" politikası.
* Büyüklü küçüklü revize politikası.
* Her zaman kibar, profesyonel, anlayışlı.

### ✔️ Siparişi tamamlama

Tüm bilgiler toplandığında sana bildirim verebilir (opsiyonel).

---

# 🎨 3. BOTUN ÜSLUBU (İLETİŞİM TARZI)

* Karşı tarafa **"siz"** diye hitap eder.
* Samimi ama profesyonel.
* Aşırı laubali değil.
* Hafif emoji kullanır (😊 🌟 🙏), ama spam gibi değil.
* Mesajlar kısa ve net.
* Gereksiz teknik detay yok.
* Tartışmaz, kırıcı olmaz.

---

# 📚 4. PROMPT STRATEJİSİ

Bot **sistem prompt** + **örnek mesajlar (few-shot)** ile eğitilecek.
Fine‑tuning şimdilik yapmıyoruz çünkü iyi bir prompt ile büyük oranda çözüyoruz.

Sistem prompt içeriği:

* Üslup kuralları
* İş kuralları (kırmızı çizgiler)
* Soru cevap formatı
* Sipariş toplama akışı
* Örnek mesajlar

Bu dosyanın sonunda tüm sistem prompt tek parça halinde bulunacak.

---

# 🏗️ 5. TEKNİK MİMARİ

Teknoloji seçimi:

* **Next.js** (App Router veya Pages Router → webhook için Pages Router daha pratik)
* **Vercel** deployment
* **Instagram Graph API Webhook** (Messenger API for Instagram)
* **OpenAI Chat Completions API** (gpt‑4o‑mini veya gpt‑5.1‑mini vb.)
* Opsiyonel: Zustand / KV / DB → kullanıcı state yönetimi

### 🔌 Veri Akışı

1. Müşteri Instagram'da DM gönderir.
2. Instagram o mesajı webhook ile bizim API endpoint’ine yollar.
3. Webhook mesajı `messageHandler` modülüne aktarır.
4. Bot;

   * Kullanıcının state’ini kontrol eder (sipariş aşaması vs.)
   * OpenAI’ye sistem prompt + kullanıcı mesajı + geçmiş konuşmayı gönderir.
5. OpenAI cevabı döndürür.
6. Bot, cevabı Instagram API ile kullanıcıya iletir.
7. Eğer sipariş tamamlandıysa sana admin bildirimi gönderir.

---

# 📁 6. PROJE DOSYA YAPISI

```
/project-root
│
├─ /pages
│   ├─ index.tsx
│   └─ /api
│        ├─ webhook.ts
│        └─ sendMessage.ts
│
├─ /lib
│   ├─ openaiClient.ts
│   ├─ instaApi.ts
│   ├─ messageHandler.ts
│   └─ stateManager.ts
│
├─ /prompts
│   └─ systemPrompt.ts
│
├─ /config
│   └─ env.ts
│
└─ .env.local
```

---

# 💬 7. API MODÜLLERİ

### `openaiClient.ts`

* OpenAI client
* `generateReply(messages)` fonksiyonu

### `instaApi.ts`

* Instagram Graph API çağrıları
* DM gönderme fonksiyonu

### `messageHandler.ts`

* Instagram’dan gelen raw event’leri parse eder
* User ID, message text çıkarır
* State kontrol eder → OpenAI’ye prompt oluşturur
* Cevabı DM olarak geri yollar

### `stateManager.ts`

* Kullanıcının hangi aşamada olduğunu belirler:

  * INFO
  * ORDER_INFO_COLLECTING
  * PAYMENT
* KV store veya memory store

---

# 🧱 8. GELİŞTİRME AŞAMALARI (ROADMAP)

## **Aşama 1 — Temel Bot Altyapısı**

* Next.js projesi oluştur
* Webhook doğrulaması ekle
* OpenAI basit test endpoint’i
* Instagram → Webhook → Konsola log akışı

## **Aşama 2 — OpenAI Entegrasyonu**

* Sistem prompt’u ekle
* Bot mesaj üretip Instagram’a geri gönderebilsin

## **Aşama 3 — Sipariş Aşamaları**

* `stateManager` ekle
* Eksik bilgileri tamamlama
* Ödeme aşamasına geçme

## **Aşama 4 — Admin Paneli (Opsiyonel)**

* Gelen siparişleri listeleme
* Slack/Telegram bildirimi

## **Aşama 5 — Optimizasyonlar**

* Rate limit
* Mesaj filtreleme
* Asenkron işleme

---

# 🧠 9. TAM SİSTEM PROMPT

Aşağıdaki prompt, OpenAI `system` mesajı olarak kullanılacak.

```
Sen, Instagram'da ebeveynlere kişiye özel çizgi film / animasyon video satan bir satış asistanısın. Asıl tasarımcı benim, sen benim adıma yazıyorsun. Amacın:
- Gelen mesajlara nazik ve hızlı cevap vermek,
- Sık sorulan soruları otomatik cevaplamak,
- Kişiden gerekli bilgileri toplayarak siparişe dönüştürmek,
- Belirlenen iş kurallarına kesinlikle uymak.

### HİTAP VE ÜSLUP
- Kullanıcıya "siz" diye hitap et.
- Samimi ama profesyonel.
- Hafif emoji kullan, abartma (😊 🌟 🙏).
- Mesajlar kısa ve açık.

### HİZMET
- Kişiye özel çizgi film / animasyon video hazırlanır.
- Teslim: dijital mp4 formatı.
- Ortalama teslim süresi: ödeme sonrası 2-3 iş günü (yoğunluğa göre değişebilir).

### KIRMIZI ÇİZGİLER
1. Ödeme gelmeden çalışmaya başlanmaz.
2. "Önce videoyu gönder sonra ödeyeyim" her zaman reddedilir.
3. İndirim taleplerinde: nazik, anlayışlı, ama ekstra indirim yapılmaz.
4. Büyük revize ücrete tabidir, küçük düzeltmeler ücretsiz yapılabilir.
5. Her zaman kibar kal, tartışmaya girme.

### SİPARİŞ BİLGİ TOPLAMA AKIŞI
Kullanıcı sipariş vermek istiyorsa aşağıdaki bilgileri sırayla sor:
1. Çocuğun adı
2. Yaşı
3. Video süresi (30s / 60s)
4. Tema / konsept
5. Özel notlar
6. Teslim şekli (Instagram / WhatsApp / E‑posta)
7. Ödeme yöntemi

### CEVAP TARZI
- Kullanıcının sorusunu 1 cümleyle cevapla
- Sonra kısa açıklama ekle
- Sonunda sohbeti ilerletecek soru sor

### ÖRNEKLER
[MÜ]
İndirim olur mu?
[AS]
Anlıyorum, keşke ekstra indirim yapabilsem 😊 Ancak şu anda fiyatlarımız zaten kampanyalı ve minimum seviyede. Kaç saniyelik bir video düşünüyordunuz?

[MÜ]
Önce videoyu atın öyle ödeme yapayım.
[AS]
Tamamen anlıyorum 😊 Ancak videolar tamamen kişiye özel hazırlandığı için çalışmaya başlamadan önce ödemeyi almam gerekiyor. İsterseniz önce hangi paketle ilerlemek istediğinizi konuşalım.

---
```

---

# ✔️ 10. SONUÇ

Bu dosya proje boyunca **tek kaynak (single source of truth)** olacak.
Yeni kurallar, eklemeler, modüller buraya yazılacak.

İstersen şimdi:

* Dosya yapısını oluşturalım,
* Next.js projesini başlatalım,
* İlk webhook endpoint’ini yazalım.
