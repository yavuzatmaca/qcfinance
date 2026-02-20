'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AnnouncementBar from '@/components/ui/AnnouncementBar';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
