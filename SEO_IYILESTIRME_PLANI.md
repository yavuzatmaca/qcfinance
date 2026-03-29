# 🚀 SEO İyileştirme Planı - QCFinance.ca

## 📊 Mevcut Durum Analizi

### ✅ İyi Yapılanlar:
- Schema markup (Organization, LocalBusiness, Website)
- Sitemap.xml (ana + blog + image)
- Robots.txt
- Open Graph etiketleri
- Meta açıklamalar
- Canonical URL'ler
- Mobil uyumlu
- Hızlı yükleme (Next.js)
- 33 blog yazısı
- 341 programmatik SEO sayfası (maaş sayfaları)

### ⚠️ İyileştirilebilir:
- Internal linking stratejisi
- Breadcrumb schema
- FAQ schema (sadece bazı sayfalarda var)
- Video schema (yok)
- İnceleme/Değerlendirme schema
- Yerel SEO optimizasyonu
- Backlink stratejisi
- İçerik tazeliği

---

## 🎯 ÖNCELİK 1: TEKNİK SEO (1-2 Hafta)

### 1.1 Breadcrumb Schema Ekle

**Neden önemli:** Google arama sonuçlarında breadcrumb gösterir, tıklama oranı artar.

**Yapılacaklar:**
```typescript
// components/BreadcrumbSchema.tsx oluştur
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Ana Sayfa",
      "item": "https://qcfinance.ca"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Hesaplayıcılar",
      "item": "https://qcfinance.ca/salaire-net-quebec"
    }
  ]
}
```

**Eklenecek sayfalar:**
- Tüm hesaplayıcı sayfaları
- Blog yazıları
- Kategori sayfaları

**Etki:** +5-10% tıklama oranı artışı

---

### 1.2 FAQ Schema Genişlet

**Mevcut durum:** Sadece bazı sayfalarda var

**Yapılacaklar:**
- Her hesaplayıcı sayfasına FAQ schema ekle
- En az 5-7 soru/cevap
- Gerçek kullanıcı sorularını kullan

**Örnek sayfalar:**
- /calcul-hypotheque → "Ne kadar borç alabilirim?"
- /salaire-net-quebec → "Net maaşımı nasıl hesaplarım?"
- /allocations-familiales → "Ne kadar alacağım?"

**Etki:** Öne çıkan snippet'ler için şans artar

---

### 1.3 HowTo Schema Ekle

**Neden:** Google "Nasıl yapılır" zengin sonuçları gösterir

**Eklenecek sayfalar:**
```typescript
// Örnek: /calcul-hypotheque
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "İpoteğinizi nasıl hesaplarsınız",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Ev fiyatını girin",
      "text": "Mülkünüzün satın alma fiyatını girerek başlayın"
    },
    {
      "@type": "HowToStep",
      "name": "Peşinatınızı ekleyin",
      "text": "Peşinat tutarınızı belirtin (minimum %5)"
    }
  ]
}
```

**Etki:** Zengin sonuçlar, daha iyi tıklama oranı

---

### 1.4 Video Schema (Gelecek için)

**Plan:** YouTube kanalı açıp video içerik üret

**Video fikirleri:**
- "Net maaşınızı 2 dakikada nasıl hesaplarsınız"
- "İpotek: Kaçınılması gereken 5 hata"
- "REER vs CELI: Hangisini seçmeli?"

**Schema:**
```typescript
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Net maaşınızı nasıl hesaplarsınız",
  "description": "Kapsamlı rehber...",
  "thumbnailUrl": "https://qcfinance.ca/video-thumb.jpg",
  "uploadDate": "2026-03-04",
  "duration": "PT5M30S"
}
```

---

## 🎯 ÖNCELİK 2: İÇERİK SEO (Devam Eden)

### 2.1 Internal Linking Stratejisi

**Mevcut durum:** Bazı linkler var ama sistematik değil

**Yapılacaklar:**

**A. Hub Sayfaları Oluştur:**
```
/impots-quebec (hub)
  ├── /salaire-net-quebec
  ├── /declaration-simplifiee
  ├── /taux-horaire
  └── Blog: "Vergi azaltmak için 10 strateji"

/immobilier-quebec (hub)
  ├── /calcul-hypotheque
  ├── /capacite-emprunt
  ├── /louer-ou-acheter
  └── Blog: "İlk ev satın alma rehberi"

/famille-quebec (hub)
  ├── /allocations-familiales
  ├── /frais-de-garde
  └── Blog: "Tam aile bütçesi"
```

**B. İlgili Araçlar Bileşeni:**
```typescript
// components/RelatedTools.tsx
<div className="related-tools">
  <h3>İlgili araçlar</h3>
  <ul>
    <li><Link href="/calcul-hypotheque">İpotek hesaplayıcı</Link></li>
    <li><Link href="/capacite-emprunt">Borçlanma kapasitesi</Link></li>
  </ul>
</div>
```

**C. Blog'da Bağlamsal Linkler:**
- Her blog 3-5 hesaplayıcıya link vermeli
- Doğal ve çeşitli anchor text
- Çift yönlü linkler (hesaplayıcı → blog, blog → hesaplayıcı)

**Etki:** +20-30% sitede kalma süresi, daha iyi tarama

---

### 2.2 İçerik Tazeliği

**Strateji:** Düzenli olarak güncelle

**Aylık plan:**
- Hafta 1: 2 hesaplayıcıyı güncelle (tarihler, oranlar)
- Hafta 2: 2 yeni blog yayınla
- Hafta 3: 2 eski blogu güncelle
- Hafta 4: 1 kapsamlı rehber oluştur (3000+ kelime)

**Güncelleme önceliği:**
1. En çok trafik alan sayfalar
2. Yüksek çıkış oranına sahip sayfalar
3. Eski tarihli sayfalar

**Etki:** Google taze içeriği tercih eder

---

### 2.3 Uzun Form İçerik

**Hedef:** 10 ultra-kapsamlı rehber (3000-5000 kelime)

**Öncelikli konular:**
1. "Quebec Vergileri Tam Rehberi 2026" (5000 kelime)
2. "Quebec'te İlk Evinizi Satın Alma: Nihai Rehber" (4000 kelime)
3. "Quebec Aile Bütçesi: Tam Model 2026" (3500 kelime)
4. "Quebec Emeklilik Tasarrufu: Tam Strateji" (4000 kelime)
5. "Quebec'te Yatırım: Başlangıçtan Uzmanlığa Rehber" (4500 kelime)
6. "Quebec'te Borçlar: Çözümler ve Stratejiler" (3500 kelime)
7. "Quebec Gayrimenkul: Bilmeniz gereken her şey" (4000 kelime)
8. "Quebec Serbest Çalışan: Mali Rehber" (3500 kelime)
9. "Quebec Yardımları ve Kredileri: Tam Rehber" (3000 kelime)
10. "Quebec Mali Planlama: 20'den 65'e" (4500 kelime)

**Format:**
- Tıklanabilir içindekiler tablosu
- H2, H3 ile bölümler
- İnfografikler
- Entegre hesaplayıcılar
- SSS bölümü
- İndirilebilir kontrol listesi (lead magnet)

**Etki:** Doğal backlink'ler, otorite, öne çıkan snippet'ler

---

## 🎯 ÖNCELİK 3: YEREL SEO (2-3 Hafta)

### 3.1 Google İşletme Profili

**Adımlar:**
1. "QCFinance.ca" profili oluştur
2. Kategori: "Mali Danışman" veya "Web Sitesi"
3. Optimize edilmiş açıklama (750 karakter)
4. Fotoğraflar: Logo, hesaplayıcı ekran görüntüleri
5. Haftalık gönderiler
6. SSS bölümü doldur

**Haftalık gönderiler:**
- Pazartesi: Vergi ipucu
- Çarşamba: Yeni blog
- Cuma: İlginç istatistik

---

### 3.2 Yerel Kayıtlar

**Gönderilecek ilk 20 dizin:**

**Ücretsiz:**
1. Google İşletme Profili ⭐
2. Bing Places
3. Apple Maps
4. Yelp.ca
5. YellowPages.ca
6. 411.ca
7. Cylex Canada
8. Hotfrog.ca
9. Brownbook.net
10. Tupalo.com

**Ücretli (opsiyonel):**
11. BBB (Better Business Bureau) - $500/yıl
12. Trustpilot
13. Sitejabber

**Quebec'e özel:**
14. Quebec.com
15. MontrealPlus.ca
16. QuebecOriginal.com
17. Yerel Ticaret Odası
18. Index Québec
19. Québec 411
20. Pages Jaunes Québec

**NAP Tutarlılığı:**
```
İsim: QCFinance.ca
Adres: [Eğer adresiniz varsa]
Telefon: [Eğer numaranız varsa]
Web Sitesi: https://qcfinance.ca
```

---

### 3.3 Yerel İçerik

**Yerel sayfalar oluştur:**

```
/montreal
  - Montreal yaşam maliyeti (✅ zaten yapıldı!)
  - Montreal ortalama maaş
  - Montreal gayrimenkul
  - Uyarlanmış hesaplayıcılar

/quebec-city
  - Quebec yaşam maliyeti
  - Quebec ortalama maaş
  - Quebec gayrimenkul

/gatineau
/laval
/longueuil
```

**Format:**
- Özel yerel veriler
- Önceden doldurulmuş değerlerle hesaplayıcılar
- Yerel referanslar
- Yerel kaynaklar (belediye hizmetlerine linkler)

**Etki:** "montreal maaş hesaplayıcı" vb. için sıralama

---

## 🎯 ÖNCELİK 4: SAYFA DIŞI SEO (Devam Eden)

### 4.1 Backlink Stratejisi

**Hedef:** 6 ayda 100 kaliteli backlink

**Taktikler:**

**A. Misafir Yazarlık (ayda 2 makale)**

**Hedefler:**
1. **Quebec Finans Blogları:**
   - JeuneProfessionnel.ca
   - Retraite101.com
   - BlogueFinance.com
   - LesAffaires.com

2. **Gayrimenkul:**
   - DuProprio.com (blog)
   - Centris.ca (kaynaklar)
   - JLR Solutions

3. **Ebeveynlik/Aile:**
   - Mamanpourlavie.com
   - Yoopa.ca
   - Naître et grandir

**Teklif Şablonu:**
```
Konu: Misafir makale: "Quebec'te Kaçınılması Gereken 10 Vergi Hatası"

Merhaba [İsim],

QCFinance.ca'nın yaratıcısıyım, ayda 10.000+ Quebecli 
tarafından kullanılan ücretsiz bir mali hesaplayıcı platformu.

Blogunuz için özel bir misafir makale önermek istiyorum:
"[Başlık]" - [Açıklama]

Makale şöyle olacak:
- %100 orijinal (2000+ kelime)
- SEO optimize
- İnfografiklerle
- Okuyucularınız için katma değer

İlgilenir misiniz?

Saygılarımla,
[Adınız]
```

---

**B. Kaynak Sayfası Link Oluşturma**

**Kaynak sayfalarını bul:**
```
Google aramaları:
- "quebec mali kaynaklar"
- "ücretsiz mali araçlar"
- "quebec vergi hesaplayıcıları"
- inurl:kaynaklar finans quebec
- intitle:"kaynaklar" finans quebec
```

**İletişim Şablonu:**
```
Konu: [Sayfa Başlığı] için kaynak önerisi

Merhaba,

Mükemmel kaynak sayfanızı keşfettim:
[URL]

QCFinance.ca'nın yararlı bir ekleme olacağını düşünüyorum:
- 19 ücretsiz mali hesaplayıcı
- Resmi 2026 verileri
- Quebec'e özel
- Ayda 10.000+ kullanıcı

Ne düşünüyorsunuz?

Teşekkürler!
```

---

**C. Dijital PR (ayda 1 basın bülteni)**

**Konular:**
1. "Yeni hesaplayıcı Quebeclilerin yılda 3000$ vergi tasarrufu yapmasına yardımcı oluyor"
2. "Araştırma: Quebecliler vergilerden sonra gerçekte ne kadar kazanıyor?"
3. "Ücretsiz araç Quebec'te ev satın almanın gerçek maliyetini ortaya çıkarıyor"
4. "10.000 Quebecli finanslarını optimize etmek için bu aracı kullanıyor"

**Dağıtım:**
- CNW (Canada NewsWire) - $500-1000
- Newswire.ca - $300-500
- Reddit r/Quebec (organik)
- LinkedIn gönderileri
- Twitter/X

---

**D. HARO (Help A Reporter Out)**

**Kayıt:** helpareporter.com (ücretsiz)

**Strateji:**
- Gazeteci taleplerine yanıt ver
- Uzmanlık: Quebec kişisel finans
- Hedef: ayda 1-2 bahsetme

**Örnek yanıt:**
```
"10.000+ Quebecli kullanıcımızın verilerine göre, 
vergilerden sonra ortalama net maaş..."
```

---

**E. Kırık Link Oluşturma**

**Araçlar:**
- Ahrefs (ücretli)
- Check My Links (Chrome uzantısı, ücretsiz)

**Süreç:**
1. Kırık linkli sayfaları bul (Quebec finans)
2. Web yöneticisiyle iletişime geç
3. İçeriğinizi değiştirme olarak öner

**Şablon:**
```
Konu: [Sayfa Başlığı]'nda kırık link

Merhaba,

Sayfanızda kırık bir link fark ettim:
[Sayfa URL'si]

[Kırık site]'ye olan link artık çalışmıyor.

Değiştirebilecek benzer bir kaynağım var:
[URL'niz]

Saygılarımla,
```

---

### 4.2 Sosyal Sinyaller

**Sosyal varlık oluştur:**

**Öncelik 1:**
- LinkedIn Şirket Sayfası
- Facebook Sayfası
- Twitter/X Hesabı

**Öncelik 2:**
- Instagram
- YouTube
- TikTok (kısa finans ipuçları)

**İçerik stratejisi:**
- Haftada 3 gönderi
- Karışım: ipuçları, istatistikler, blog linkleri
- Toplulukla etkileşim

**Örnek gönderiler:**
- "Quebeclilerin %67'sinin çok fazla vergi ödediğini biliyor muydunuz?"
- "Yeni blog: Yılda 5000$ tasarruf etmenin 10 yolu"
- "Haftanın hesaplayıcısı: İpotek"

---

## 🎯 ÖNCELİK 5: KULLANICI DENEYİMİ SEO (1-2 Hafta)

### 5.1 Core Web Vitals Optimizasyonu

**Hedefler:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Eylemler:**

**A. Görsel Optimizasyonu:**
```bash
# Tüm görselleri WebP/AVIF'e dönüştür
npm install sharp
node scripts/optimize-images.js
```

**B. Lazy Loading:**
```typescript
// AdSense'i lazy load et
<script async src="..." loading="lazy" />

// Fold altındaki görselleri lazy load et
<Image loading="lazy" />
```

**C. Font Optimizasyonu:**
```typescript
// Zaten iyi ama iyileştir:
const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif']
})
```

---

### 5.2 Mobil Optimizasyonu

**Kontrol et:**
- Dokunma hedefleri (min 44x44px) ✅
- Font boyutu (min 16px) ✅
- Viewport meta etiketi ✅
- Yatay kaydırma yok ✅

**İyileştir:**
- Mobile özel CTA'lar
- Basitleştirilmiş navigasyon
- Daha hızlı mobil yükleme

---

### 5.3 Yapılandırılmış Navigasyon

**Ekle:**

**A. Mega Menü:**
```
Hesaplayıcılar
  ├── Vergiler & Gelir
  │   ├── Net Maaş
  │   ├── Basitleştirilmiş Beyanname
  │   └── Saatlik Ücret
  ├── Gayrimenkul
  │   ├── İpotek
  │   ├── Borçlanma Kapasitesi
  │   └── Kiralamak veya Satın Almak
  └── Aile
      ├── Yardımlar
      └── Bakım Ücretleri
```

**B. Footer Linkleri:**
- Tüm hesaplayıcılar
- Blog kategorileri
- Kaynaklar
- Hakkımızda

---

## 🎯 ÖNCELİK 6: DÖNÜŞÜM OPTİMİZASYONU (Devam Eden)

### 6.1 E-posta Toplama

**Lead Magnet'ler:**
1. "PDF Rehber: Vergilerinizi Azaltmanın 25 Yolu" (e-posta gerekli)
2. "Kontrol Listesi: 2026 Vergi Beyannamesi" (e-posta gerekli)
3. "Excel Şablonu: Quebec Aile Bütçesi" (e-posta gerekli)
4. "Gelişmiş Hesaplayıcı: Emeklilik Planlaması" (e-posta gerekli)

**Yerleşim:**
- Çıkış niyeti popup'ı
- Hesaplayıcı sonucundan sonra
- Blog gönderilerinde (içerik yükseltme)
- Footer

**Araç:** Mailchimp veya ConvertKit

---

### 6.2 Sosyal Kanıt

**Ekle:**
- "10.000+ Quebecli tarafından kullanılıyor" (ana sayfa)
- Referanslar (kullanıcılardan iste)
- Güven rozetleri
- Medya bahsetmeleri (PR'dan sonra)
- "Görüldüğü yerler: [medya logoları]"

---

### 6.3 A/B Testi

**Test et:**
- CTA buton renkleri (yeşil vs mavi)
- Başlık varyasyonları
- Hesaplayıcı düzeni
- Reklam yerleşimleri

**Araç:** Google Optimize (ücretsiz) veya VWO

---

## 📊 TAKİP EDİLECEK KPI'LAR

### Haftalık:
- Google Search Console gösterimleri
- Tıklama oranı (CTR)
- Ortalama pozisyon
- Core Web Vitals
- Sayfa hızı skorları

### Aylık:
- Organik trafik (hedef: ayda +%50)
- Anahtar kelime sıralamaları (ilk 10)
- Backlink'ler (hedef: ayda +10)
- Domain Authority (hedef: 6 ayda 30+)
- Yayınlanan blog gönderileri (hedef: ayda 8-10)
- Dönüşüm oranı (hedef: %2+)
- E-posta aboneleri (hedef: ayda +200)

### Üç Aylık:
- Gelir (eğer para kazanıyorsa)
- Kullanıcı etkileşimi (sitede geçirilen süre, sayfa/oturum)
- Marka aramaları
- Sosyal medya büyümesi

---

## 🛠️ GEREKLİ ARAÇLAR

### Ücretsiz:
1. Google Search Console ✅
2. Google Analytics ✅
3. Google PageSpeed Insights
4. Google Mobile-Friendly Test
5. Schema Markup Validator
6. Screaming Frog (500 URL ücretsiz)
7. AnswerThePublic (günde 3 arama)
8. Ubersuggest (günde 3 arama)

### Ücretli (Önerilen):
1. **Ahrefs** ($99-199/ay) - Backlink'ler, anahtar kelimeler, rakipler
2. **SEMrush** ($119/ay) - Hepsi bir arada SEO
3. **Surfer SEO** ($59/ay) - İçerik optimizasyonu
4. **Grammarly Premium** ($12/ay) - İçerik kalitesi

### Opsiyonel:
1. Canva Pro ($13/ay) - Grafikler
2. Loom ($10/ay) - Video eğitimleri
3. Mailchimp ($20/ay) - E-posta pazarlama

---

## 💰 TAHMİNİ BÜTÇE

### Minimum (Kendin Yap):
- SEO araçları: $0-99/ay
- İçerik: $0 (kendin yazıyorsun)
- Backlink'ler: $0 (manuel iletişim)
- **Toplam: $0-99/ay**

### Optimal:
- SEO araçları: $199/ay (Ahrefs)
- İçerik yazarı: $300/ay (2 makale)
- İletişim için VA: $200/ay
- PR dağıtımı: $100/ay
- **Toplam: $799/ay**

### Agresif:
- SEO araçları: $299/ay (Ahrefs + Surfer)
- İçerik ekibi: $1000/ay (4 makale + güncellemeler)
- Link oluşturma hizmeti: $500/ay
- PR ajansı: $500/ay
- **Toplam: $2,299/ay**

---

## ⏱️ ZAMAN ÇİZELGESİ

### Ay 1: Temel
- ✅ Breadcrumb schema (tüm sayfalar)
- ✅ FAQ schema genişletme
- ✅ HowTo schema (5 sayfa)
- ✅ Internal linking denetimi
- ✅ 4 yeni blog

### Ay 2: İçerik
- ✅ 2 uzun form rehber (3000+ kelime)
- ✅ Hub sayfaları (3)
- ✅ İlgili araçlar bileşeni
- ✅ 4 misafir gönderi
- ✅ Google İşletme Profili

### Ay 3: Linkler
- ✅ 20 dizin gönderimi
- ✅ 10 kaynak sayfası linki
- ✅ 2 PR bülteni
- ✅ HARO yanıtları (10)
- ✅ 4 yeni blog

### Ay 4: Yerel
- ✅ 3 yerel sayfa (Montreal, Quebec, Gatineau)
- ✅ Yerel kayıtlar (20)
- ✅ Yerel içerik
- ✅ 4 misafir gönderi

### Ay 5: Ölçeklendirme
- ✅ 3 uzun form rehber
- ✅ Video içerik (5 video)
- ✅ Sosyal medya büyümesi
- ✅ E-posta pazarlama kurulumu

### Ay 6: Optimize Et
- ✅ A/B testi
- ✅ Dönüşüm optimizasyonu
- ✅ Performans ayarı
- ✅ Analitik incelemesi

---

## 🎯 6 AYLIK HEDEFLER

| Metrik | Şu An | 6 Ay Hedef | 12 Ay Hedef |
|----------|--------|-----------------|------------------|
| Organik Trafik | 6,500/ay | 50,000/ay | 150,000/ay |
| İlk 10'da Anahtar Kelime | ~20 | 200+ | 500+ |
| Backlink'ler | ~5 | 100+ | 300+ |
| Domain Authority | ~10 | 35+ | 50+ |
| Blog Gönderileri | 33 | 80+ | 150+ |
| E-posta Aboneleri | 0 | 1,000+ | 5,000+ |
| Aylık Gelir | $0 | $2,000+ | $10,000+ |

---

## ✅ HIZLI KAZANIMLAR (Bu Hafta!)

### Gün 1-2: Schema Markup
1. Breadcrumb schema ekle (5 öncelikli sayfa)
2. FAQ schema ekle (3 sayfa)
3. Schema Validator ile test et

### Gün 3-4: Internal Linking
1. İlgili Araçlar bileşeni oluştur
2. 10 ana sayfaya ekle
3. Internal link denetimi (Screaming Frog)

### Gün 5-6: İçerik
1. 3 eski sayfayı güncelle (tarihler, istatistikler)
2. 2 ince içerik sayfasına 500 kelime ekle
3. 5 meta açıklamayı optimize et

### Gün 7: İletişim
1. 5 dizine gönder
2. 3 misafir gönderi teklifi gönder
3. Google İşletme Profili oluştur

---

**Başlamaya hazır mısın? Hangi öncelikle başlayalım?** 🚀
