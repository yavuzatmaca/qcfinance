# Site Configuration Guide

## 📍 Merkezi Konfigürasyon Sistemi

Tüm site genelindeki tarihler, versiyonlar ve ayarlar `lib/siteConfig.ts` dosyasından kontrol edilir.

## 🎯 Tek Yerden Güncelleme

### Tarihleri Güncellemek

```typescript
// lib/siteConfig.ts
export const siteConfig = {
  lastUpdated: {
    date: 'Janvier 2026',  // ← Burası değişince her yerde güncellenir
    fullDate: '2026-01-29',
    year: 2026,
  },
}
```

**Etkilenen Yerler:**
- ✅ Tüm calculator sayfalarındaki "Last Updated" badge'leri
- ✅ DataSource component'lerindeki tarihler
- ✅ Schema markup'taki dateModified alanları

### Vergi Yılını Güncellemek

```typescript
taxYear: {
  current: 2026,           // ← Yıl değişince
  label: 'Taux 2026',      // ← Label'ı güncelle
  description: 'Données officielles 2026',
}
```

### Veri Kaynaklarını Güncellemek

```typescript
dataSources: {
  revenuQuebec: {
    label: 'Revenu Québec - Tables de retenues 2026',
    url: 'https://www.revenuquebec.ca/...',
    lastUpdate: 'Janvier 2026',  // ← Buradan güncelle
  },
}
```

## 🔧 Component Kullanımı

### LastUpdatedBadge

```tsx
// Otomatik (siteConfig'den alır)
<LastUpdatedBadge />

// Custom tarih
<LastUpdatedBadge date="Février 2026" />

// Compact variant
<LastUpdatedBadge variant="compact" />
```

### DataSource

```tsx
// Predefined source (önerilen)
<DataSource source="revenuQuebec" />
<DataSource source="bankOfCanada" />
<DataSource source="statisticsCanada" />

// Custom source
<DataSource 
  label="Custom Source"
  url="https://example.com"
  lastUpdate="Janvier 2026"
/>
```

## 📅 Yıllık Güncelleme Checklist

Her yıl başında (Ocak):

1. ✅ `lib/siteConfig.ts` aç
2. ✅ `lastUpdated.date` → "Janvier 2027" yap
3. ✅ `lastUpdated.year` → 2027 yap
4. ✅ `taxYear.current` → 2027 yap
5. ✅ `taxYear.label` → "Taux 2027" yap
6. ✅ `taxConstants` değerlerini güncelle (RRQ, RQAP, vb.)
7. ✅ `dataSources` URL'lerini kontrol et

**Hepsi bu kadar!** Tüm site otomatik güncellenir.

## 🎨 Avantajlar

- ✅ **Tek yerden kontrol**: 1 dosya, tüm site
- ✅ **Hata riski azalır**: Manuel güncelleme yok
- ✅ **Tutarlılık**: Her yerde aynı tarih
- ✅ **Hızlı güncelleme**: 5 dakikada tüm site
- ✅ **Type-safe**: TypeScript ile güvenli

## 🚀 Gelecek İyileştirmeler

- [ ] Otomatik yıl değiştirme (Ocak 1'de)
- [ ] Version history tracking
- [ ] A/B testing için feature flags
