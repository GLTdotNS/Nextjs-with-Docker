export async function POST(req: Request) {
  const body = await req.json();

  await fetch("http://api:4000/add", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return Response.json({ ok: true });
}