"use client";

import { useEffect, useState } from "react";

import { getDate } from "@/lib/actions";

export default function Time() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      getDate().then((date) => {
        setDate(date);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>Time CSR: {date ? date.toLocaleString("fr-FR") : "Loading..."}</div>
  );
}
