import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: "LG전자 BEST SHOP",
  description: "LG전자 BEST SHOP 용산전자 상담 신청 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <ConditionalLayout />
        <Footer />
      </body>
    </html>
  );
}
