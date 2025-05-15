"use client";

import { useRef } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Refs() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div>
      <h3>Refs</h3>
      <Input ref={inputRef} />
      <Button onClick={handleClick}>Focus input</Button>
    </div>
  );
}
