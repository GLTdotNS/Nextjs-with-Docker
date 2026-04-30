export async function GET() {
  const res = await fetch("http://api:4000");
  const data = await res.json();

  return Response.json(data);
}