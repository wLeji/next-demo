export default async function SecretsRSC() {
  // Actions can be defined within components with "use client" directive
  async function getPrivateSecret() {
    "use server";
    return process.env.SECRET;
  }

  const secretFromAction = await getPrivateSecret();
  const privateSecret = process.env.SECRET;
  const publicSecret = process.env.NEXT_PUBLIC_SECRET;

  return (
    <div>
      <h3>Secrets RSC</h3>
      <table className="border-collapse">
        <tbody>
          <tr>
            <td className="p-2">Private secret from env:</td>
            <td className="p-2">{privateSecret}</td>
          </tr>
          <tr>
            <td className="p-2">Public secret from env:</td>
            <td className="p-2">{publicSecret}</td>
          </tr>
          <tr>
            <td className="p-2">Private secret from local action:</td>
            <td className="p-2">{secretFromAction}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
