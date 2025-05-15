import { Suspense } from "react";

import TimeStreamingCSR from "@/components/demos/time-streaming-csr";

import { getDate } from "@/lib/actions";

export default async function Time() {
  const date = getDate();

  return (
    <Suspense fallback={<div>Loading date...</div>}>
      <TimeStreamingCSR date={date} />
    </Suspense>
  );
}
