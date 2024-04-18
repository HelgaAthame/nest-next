import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import bgimage from "&/background.webp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music library",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-screen flex-col items-center justify-between overflow-hidden bg-cover "
      style={{
        backgroundImage: `url(${bgimage.src})`,
      }}
      >
      <Navbar/>
      <section className="grow overflow-y-auto w-full ">
      {children}</section>      
    </main></body>
    </html>
  );
}
