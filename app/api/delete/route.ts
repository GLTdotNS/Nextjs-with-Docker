export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  await fetch(`http://api:4000/delete?id=${id}`, {
    method: "DELETE"
  });

  return Response.json({ ok: true });
}