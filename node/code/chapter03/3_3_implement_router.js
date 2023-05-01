const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (path === "/user") {
      user(req, res);
    } else if (path === "/feed") {
      feed(req, res);
    } else {
      notFound(req, res);
    }
  })
  .listen("3000", () => console.log("server start"));

const user = (req, res) => {
  res.end(`[USER] name: TEMP`);
};

const feed = (req, res) => {
  res.end(`
  <ul>
    <li>temp1</li>
    <li>temp2</li>
    <li>temp3</li>
  </ul>
`);
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 page not found");
};