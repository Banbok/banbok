import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VoiceButton from "./_components/Voice/VoiceButton";
import AuthInitializer from "./_components/AuthInitializer";
import PomodoroWrapper from "./_components/Timer/PomodoroWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "반복",
  description: "코딩 테스트의 반복 학습을 도와주는 웹 사이트 입니다.",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <VoiceButton />
        <AuthInitializer />
        <PomodoroWrapper />
      </body>
    </html>
  );
}
