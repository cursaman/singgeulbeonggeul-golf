"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});

export function CurrentDateTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <time className="current-time" dateTime={now?.toISOString()} suppressHydrationWarning>
      {now ? formatter.format(now) : "날짜와 시간 불러오는 중"}
    </time>
  );
}
