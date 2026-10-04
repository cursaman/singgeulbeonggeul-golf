import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "싱글벙글 스크린골프회",
  description: "싱글벙글 스크린골프회 모임 안내 및 회원 등록"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
