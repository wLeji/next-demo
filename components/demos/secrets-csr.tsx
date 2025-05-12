"use client";

import { useEffect, useState } from "react";
import { getPrivateSecret } from "@/lib/actions";

export default function SecretsCSR() {
  const [secretFromAction, setSecretFromAction] = useState<string | undefined>(
    undefined
  );
  const [secretFromEnv, setSecretFromEnv] = useState<string | undefined>(
    undefined
  );
  const publicSecret = process.env.NEXT_PUBLIC_SECRET;

  useEffect(() => {
    getPrivateSecret().then((secret) => {
      setSecretFromAction(secret);
    });

    const interval = setTimeout(() => {
      setSecretFromEnv(process.env.SECRET);
    }, 1000);
    return () => clearTimeout(interval);
  }, []);

  return (
    <div>
      <h3>Secrets CSR</h3>
      <table className="border-collapse">
        <tbody>
          <tr>
            <td className="p-2">Private secret from env:</td>
            <td className="p-2">{secretFromEnv || "undefined"}</td>
          </tr>
          <tr>
            <td className="p-2">Public secret from env:</td>
            <td className="p-2">{publicSecret || "undefined"}</td>
          </tr>
          <tr>
            <td className="p-2">Private secret from action:</td>
            <td className="p-2">{secretFromAction || "undefined"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
