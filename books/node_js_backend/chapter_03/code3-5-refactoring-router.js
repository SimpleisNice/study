const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;

    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (path in urlMap) {
      urlMap[path](req, res);
    } else {
      notFound(req, res);
    }
  })
  .listen(3000, () => {
    console.log("server started on port 3000");
  });

const user = (req, res) => {
  const userInfo = url.parse(req.url, true).query;
  res.end(
    `[user] name: ${userInfo?.name ?? "null"}, age: ${userInfo?.age ?? "null"}`
  );
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

const urlMap = {
  "/user": user,
  "/feed": feed,
};
