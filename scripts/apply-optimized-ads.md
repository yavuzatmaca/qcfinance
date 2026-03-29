# Quick Implementation Guide - Optimized Ads

## For High-Traffic Pages

### Step 1: Update Imports
```typescript
// Replace old imports
import AdSenseAd from '@/components/AdSenseAd'

// With new imports
import OptimizedAdPlacement from '@/components/OptimizedAdPlacement'
import DesktopSidebarAd from '@/components/DesktopSidebarAd'
import MobileAnchorAd from '@/components/MobileAnchorAd'
import { AD_SLOTS } from '@/config/ad-placements'
```

### Step 2: Add After-Result Ad
```typescript
{/* After calculator component */}
<YourCalculatorComponent />

{/* OPTIMIZED AD 1: After Calculator Result */}
<OptimizedAdPlacement
  adSlot={AD_SLOTS.afterResult}
  placement="after-result"
  adFormat="fluid"
  lazyLoad={false}
/>
```

### Step 3: Add Before-FAQ Ad
```typescript
{/* Before FAQ section */}
<OptimizedAdPlacement
  adSlot={AD_SLOTS.beforeFaq}
  placement="before-faq"
  adFormat="fluid"
  lazyLoad={true}
/>

<h2>Questions fréquentes</h2>
{/* FAQ content */}
```

### Step 4: Add Desktop Sidebar Ad
```typescript
{/* In sidebar column */}
<div className="hidden lg:block lg:col-span-4">
  <div className="space-y-6">
    {/* Other sidebar content */}
    
    <DesktopSidebarAd
      adSlot={AD_SLOTS.sidebar}
      sticky={true}
    />
  </div>
</div>
```

### Step 5: Add Mobile Anchor Ad
```typescript
{/* At end of page, before closing div */}
      <MobileAnchorAd
        adSlot={AD_SLOTS.anchor}
        enabled={true}
      />
    </div>
  )
}
```

### Step 6: Remove Old Ad Placements
- Remove all old `<AdSenseAd />` components
- Remove manual ad containers
- Remove old spacing divs

---

## For Medium-Traffic Pages

### Conservative Approach (1 mobile ad, 2 desktop ads)

```typescript
{/* After calculator */}
<OptimizedAdPlacement
  adSlot={AD_SLOTS.afterResult}
  placement="after-result"
  adFormat="fluid"
  lazyLoad={false}
/>

{/* Desktop sidebar only */}
<DesktopSidebarAd
  adSlot={AD_SLOTS.sidebar}
  sticky={true}
/>

{/* No anchor ad */}
```

---

## Testing Checklist

After implementing:
- [ ] Test on mobile (iPhone, Android)
- [ ] Test on desktop (Chrome, Safari, Firefox)
- [ ] Verify max 2 ads on mobile
- [ ] Verify anchor ad appears after scroll
- [ ] Verify anchor ad is dismissible
- [ ] Check CLS score (<0.1)
- [ ] Check LCP (<2.5s)
- [ ] Verify no ads before main content on mobile

---

## Configuration

Update `config/ad-placements.ts` for each page:

```typescript
'/your-page': {
  enabled: true,
  maxMobileAds: 2,
  maxDesktopAds: 3,
  placements: {
    afterResult: true,
    beforeFaq: true,
    sidebar: true
  },
  anchorAd: {
    enabled: true,
    mobile: true
  }
}
```
