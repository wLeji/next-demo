"use client";

import { use } from "react";

export default function TimeStreamingCSR({ date }: { date: Promise<Date> }) {
  const dateData = use(date);
  // see https://react.dev/reference/react/use
  return <div>Time streaming: {dateData.toLocaleString("fr-FR")}</div>;
}
