const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify({
    message: "Hello from second sdafasfd 🚀"
  }));
});

server.listen(4000, () => {
  console.log("API running on port 4000");
});