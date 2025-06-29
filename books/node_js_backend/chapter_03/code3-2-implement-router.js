const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (path === "/user") {
    res.end("[user] name: 안나, age: 30");
  } else if (path === "/feed") {
    res.end(`
      <ul>
        <li>Feedback 1</li>
        <li>Feedback 2</li>
        <li>Feedback 3</li>
      </ul>
      `);
  } else {
    res.statusCode = 404;
    res.end("404 page not found");
  }
});

server.listen(3000, () => {
  console.log("make router started on port 3000");
});
