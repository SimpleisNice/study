const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;

    res.setHeader("content-type", "text/html; charset=utf-8");

    if (path === "/user") {
      user(req, res);
    } else if (path === "/feed") {
      feed(req, res);
    } else {
      notFound(req, res);
    }
  })
  .listen(3000, () => {
    console.log("make router started");
  });

const user = (req, res) => {
  res.end("[user] name: 안나, age: 30");
};

const feed = (req, res) => {
  res.end(`
    <ul>
      <li>Feedback 1</li>
      <li>Feedback 2</li>
      <li>Feedback 3</li>
    </ul>
  `);
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 page not found");
};
