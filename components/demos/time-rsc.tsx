import { getDate } from "@/lib/actions";

export default async function Time() {
  const date = await getDate();
  return (
    <div>
      <h3>Time</h3>
      Time RSC: {date.toLocaleString("fr-FR")}
    </div>
  );
}
