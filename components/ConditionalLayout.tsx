'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AnnouncementBar from '@/components/ui/AnnouncementBar';
import GlobalStickyAd from '@/components/GlobalStickyAd';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStickyAd 
        adSlot="6737944215" 
        enabled={true}
      />
      <AnnouncementBar />
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
