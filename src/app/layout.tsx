import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// ✅ استيراد Navbar و Footer
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: '--font-jakarta' });

export const metadata: Metadata = {
  title: "SmartLoans - Financial Calculators & AI Advice",
  description: "Advanced financial tools for mortgage, loans, and investment planning powered by AI.",
  // 👇👇👇 تم إضافة كود التحقق من Impact هنا 👇👇👇
  verification: {
    other: {
      'impact-site-verification': 'd0d35334-60c9-4605-8500-1d7a3106650a',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ كود AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6313859650856618"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} ${jakarta.variable} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white antialiased flex flex-col min-h-screen`}>
        
        {/* ✅ كود Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MCZBZEJZCX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MCZBZEJZCX');
          `}
        </Script>

        {/* ✅ Navbar */}
        <Navbar />

        {/* المحتوى المتغير */}
        <main className="flex-grow">
          {children}
        </main>

        {/* ✅ Footer */}
        <Footer />
        
      </body>
    </html>
  );
}