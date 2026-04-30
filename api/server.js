const http = require("http");

let tasks = [];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  // READ
  if (req.url === "/tasks" && req.method === "GET") {
    return res.end(JSON.stringify(tasks));
  }

  // CREATE
  if (req.url === "/add" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      const { text } = JSON.parse(body);

      const newTask = {
        id: Date.now(),
        text
      };

      tasks.push(newTask);
      res.end(JSON.stringify(newTask));
    });

    return;
  }

  // UPDATE
  if (req.url === "/update" && req.method === "PUT") {
    let body = "";

    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      const { id, text } = JSON.parse(body);

      tasks = tasks.map(t =>
        t.id === id ? { ...t, text } : t
      );

      res.end(JSON.stringify({ ok: true }));
    });

    return;
  }

  // DELETE (FIXED - query param)
  if (req.url.startsWith("/delete") && req.method === "DELETE") {
    const url = new URL(req.url, "http://localhost:4000");
    const id = Number(url.searchParams.get("id"));

    tasks = tasks.filter(t => t.id !== id);

    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.end(JSON.stringify({ message: "API running 🚀" }));
});

server.listen(4000, "0.0.0.0", () => {
  console.log("API running on 4000");
});