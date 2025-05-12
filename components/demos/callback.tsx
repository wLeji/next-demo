"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";

export function Callback() {
  const [offset, setOffset] = useState(0);

  const double = useCallback(() => {
    return offset * 2;
  }, [offset]);

  return (
    <div>
      <h3>Callback </h3>
      <p>Offset: {offset}</p>

      <Button onClick={() => setOffset(offset + 1)}>Increment</Button>
      <Button onClick={() => alert(double())}>Get double</Button>
    </div>
  );
}
