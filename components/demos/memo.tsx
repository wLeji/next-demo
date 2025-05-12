"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

export function Memo() {
  const [offset, setOffset] = useState(0);

  const sum = useMemo(() => {
    let s = 0;
    for (let i = 0; i < 100; i++) {
      s += offset;
    }
    return s;
  }, [offset]);

  return (
    <div>
      <h3>Memo </h3>
      <p>Sum: {sum}</p>
      <Button onClick={() => setOffset(offset + 1)}>Add</Button>
    </div>
  );
}
