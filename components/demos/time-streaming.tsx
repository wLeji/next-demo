import { getDate } from "@/lib/actions";
import { Suspense } from "react";
import TimeStreamingCSR from "./time-streaming-csr";

export default async function Time() {
  const date = getDate();

  return (
    <Suspense fallback={<div>Loading date...</div>}>
      <TimeStreamingCSR date={date} />
    </Suspense>
  );
}
