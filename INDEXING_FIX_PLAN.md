# Google Indexing Fix Plan - QCFinance

## Problem
260 sayfa "Keşfedildi - şu anda dizine eklenmemiş değil" durumunda (2.5 ay)

## Tespit Edilen Sorunlar

### 1. ✅ Canonical URL Tutarsızlığı (FIXED)
- Bazı sayfalarda tam URL, bazılarında relative path
- Blog detay sayfalarında canonical URL eksikti
- **Çözüm:** Blog sayfalarına canonical URL eklendi

### 2. ✅ Sitemap Optimizasyonu (FIXED)
- 341 salary sayfası aynı priority'de (0.8)
- Blog priority düşüktü (0.7)
- **Çözüm:** 
  - Salary sayfaları priority'leri optimize edildi (0.6-0.75)
  - Blog priority 0.8'e yükseltildi
  - Featured blog posts 0.9 priority

### 3. ⚠️ Internal Linking Zayıf (NEEDS WORK)
- 260 sayfa keşfedilmiş ama önemsiz görünüyor
- Sayfalar arası bağlantılar yetersiz

### 4. ⚠️ Content Quality Signals (NEEDS WORK)
- Google sayfaları "low value" olarak görebilir
- Özellikle salary sayfaları çok benzer içerik

## Hemen Yapılması Gerekenler

### A. Google Search Console'da Manuel İşlemler (BUGÜN)

1. **Sitemap'i Yeniden Gönder**
   ```
   Search Console > Sitemaps > sitemap.xml > Yeniden Gönder
   Search Console > Sitemaps > blog-sitemap.xml > Yeniden Gönder
   ```

2. **URL Inspection Tool ile Test**
   - 5-10 önemli sayfayı test et
   - "Request Indexing" butonuna bas
   - Özellikle yeni blog yazılarını:
     - /blog/assurance-vie-quebec-2026
     - /blog/frais-bancaires-quebec-2026
     - /blog/refinancement-hypothecaire-quebec-2026

3. **Bulk URL Submission (Önemli)**
   - Search Console > URL Inspection
   - En önemli 10 sayfayı manuel olarak gönder:
     - /salaire-net-quebec/50000
     - /salaire-net-quebec/60000
     - /salaire-net-quebec/70000
     - /salaire-net-quebec/80000
     - /calcul-hypotheque
     - /simulateur-vie-quebec
     - /blog (ana sayfa)
     - Yeni 3 blog yazısı

### B. Technical SEO İyileştirmeleri (BU HAFTA)

1. **Internal Linking Güçlendir**
   - Her salary sayfasına "İlgili Hesaplayıcılar" bölümü ekle
   - Blog yazılarından hesaplayıcılara link
   - Hesaplayıcılardan ilgili blog yazılarına link

2. **Structured Data Ekle**
   - Salary sayfalarına FAQPage schema
   - Calculator sayfalarına SoftwareApplication schema
   - Breadcrumb schema tüm sayfalara

3. **Page Speed Optimize Et**
   - Görselleri optimize et
   - Lazy loading ekle
   - Cache stratejisi iyileştir

### C. Content İyileştirmeleri (BU HAFTA)

1. **Salary Sayfalarını Zenginleştir**
   - Her salary range için unique content
   - "Bu maaşla neler yapabilirsiniz?" bölümü
   - İlgili meslekler listesi
   - Bölgesel karşılaştırmalar

2. **Blog İçeriği Genişlet**
   - Her blog yazısına en az 2 internal link
   - İlgili hesaplayıcılara CTA
   - FAQ bölümü ekle

3. **Landing Page'leri Güçlendir**
   - Ana hesaplayıcı sayfalarına daha fazla içerik
   - User testimonials (varsa)
   - Trust signals

### D. Backlink & Social Signals (ÖNÜMÜZDEKI 2 HAFTA)

1. **Social Media Paylaşımları**
   - Yeni blog yazılarını LinkedIn'de paylaş
   - Facebook gruplarında paylaş
   - Reddit r/Quebec'te paylaş (dikkatli)

2. **Guest Posting**
   - Québec finans bloglarına ulaş
   - Guest post fırsatları ara
   - En az 2-3 quality backlink hedefle

3. **Directory Submissions**
   - Google My Business (eğer yoksa)
   - Québec business directories
   - Finance tool directories

## Beklenen Sonuçlar

### 1 Hafta İçinde:
- Yeni blog yazıları dizine girecek
- Manuel gönderilen sayfalar taranacak
- Search Console'da "Discovered" sayısı azalacak

### 2-4 Hafta İçinde:
- Salary sayfalarının %30-50'si dizine girecek
- Blog trafiği artmaya başlayacak
- Bazı long-tail keywords için ranking

### 2-3 Ay İçinde:
- Çoğu sayfa dizine girecek
- Organic trafik 2-3x artacak
- Domain authority yükselecek

## Monitoring

### Haftalık Kontrol:
- Search Console > Coverage raporu
- Indexed pages sayısı
- Discovered but not indexed sayısı
- Crawl stats

### Aylık Kontrol:
- Organic trafik (Google Analytics)
- Keyword rankings (Google Search Console)
- Backlink profili
- Page speed scores

## Notlar

- Google'ın sayfaları dizine alması 2-8 hafta sürebilir
- Sabırlı ol, sürekli iyileştir
- Quality > Quantity
- User experience her zaman öncelik

## Yapılan Değişiklikler (2026-04-12)

✅ Blog detay sayfalarına canonical URL eklendi
✅ Sitemap priority'leri optimize edildi
✅ Blog sitemap changefreq güncellendi
✅ SEO utility library oluşturuldu (lib/seo.ts)
✅ 3 yeni high-quality blog yazısı eklendi

## Sonraki Adımlar

1. Deploy yap (Vercel)
2. Sitemap'leri Search Console'a gönder
3. Yeni blog yazılarını manuel olarak index'e gönder
4. Internal linking stratejisini uygula
5. 1 hafta sonra sonuçları kontrol et
