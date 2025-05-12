"use client";

import { useEffect, useState } from "react";

export function Effects() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("count", count);
  }, [count]);

  return (
    <div>
      <h3>Effects</h3>
      <p>Count: {count}</p>
    </div>
  );
}
