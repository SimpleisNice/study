const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (path in urlMap) {
      urlMap[path](req, res);
    } else {
      notFound();
    }
  })
  .listen("3000", () => console.log("START SERVER"));

const user = (req, res) => {
  const userInfo = url.parse(req.url, true).query;
  res.end(`[user] name: ${userInfo.name}`);
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

const urlMap = {
  "/": (req, res) => res.end("HOME"),
  "/user": user,
  "/feed": feed,
};
