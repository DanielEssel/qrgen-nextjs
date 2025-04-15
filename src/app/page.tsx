// app/page.tsx
import type { Metadata } from 'next';
import Navbar from '../../components/pagesections/navbar/page';
import Heropage from "../../components/pagesections/heropage/page";
import Footer from "../../components/pagesections/footer/page";
import QRInterface from "../../components/QRInterface/QRInterface";
import MainTutorialSection from "../../components/tutorialsections/MainTutorialSection";

// Static metadata (better for SEO)
export const metadata: Metadata = {
  title: 'Home | QRGen',
  description: 'Create, customize, and download QR codes instantly with QRGen. Easy-to-use QR code generator for websites, contact info, WiFi, and more.',
  keywords: ['QR code generator', 'free QR code', 'QR code maker', 'create QR codes'],
  openGraph: {
    title: 'QRGen - Free QR Code Generator',
    description: 'Create, customize, and download QR codes instantly with QRGen.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QRGen - Free QR Code Generator',
    description: 'Create, customize, and download QR codes instantly with QRGen.',
  },
  alternates: {
    canonical: 'https://yourwebsite.com/', 
  }
};

export default function Homepage() {
  return (
    <>
      {/* No need for <Head> component - metadata is auto-injected */}

      {/* Handles the navbar component */}
      <header>
        <Navbar />
      </header>

      <main>
        <Heropage />
        <QRInterface />
        <MainTutorialSection />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}