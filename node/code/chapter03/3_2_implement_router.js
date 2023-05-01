const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (path === "/user") {
      res.end("[USER] name: @@@");
    } else if (path === "/feed") {
      res.end(`
      <ul>
        <li>temp1</li>
        <li>temp2</li>
        <li>temp3</li>
      </ul>
    `);
    } else {
      res.statusCode = 404;
      res.end("404 page not found");
    }
  })
  .listen("3000", () => console.log("start server(add router)"));
