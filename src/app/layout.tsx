import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "../components/Providers";

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito' 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  style: ['normal', 'italic'],
  variable: '--font-playfair' 
});

export const metadata: Metadata = {
  title: 'MindBridge | AI Mental Wellness',
  description: 'Your safe space for reflection and AI-powered mental support.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://mindbridge.app',
    title: 'MindBridge',
    description: 'AI-driven mental health support and daily reflection.',
    siteName: 'MindBridge',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'MindBridge App Preview',
    }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${playfair.variable} font-sans bg-slate-50 text-slate-900`}>
        <AuthProvider>
          {/* THE TOASTER MUST BE HERE */}
          <Toaster richColors position="top-center" theme="light" className="font-sans" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}