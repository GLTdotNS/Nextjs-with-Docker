export async function PUT(req: Request) {
  const body = await req.json();

  await fetch("http://api:4000/update", {
    method: "PUT",
    body: JSON.stringify(body),
  });

  return Response.json({ ok: true });
}