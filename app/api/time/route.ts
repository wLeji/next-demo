export async function GET() {
  const data = {
    time: new Date().toISOString(),
  };
  return Response.json(data);
}
