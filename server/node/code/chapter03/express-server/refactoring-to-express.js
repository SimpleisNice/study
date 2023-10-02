// const http = require("http");
// const url = require("url");

// http
//   .createServer((res, req) => {
//     const pathName = url.parse(res.url, true).pathname;

//     req.setHeader("Content-Type", "text/html");
//     if (pathName === "/feed") {
//       req.statusCode = 200;
//       req.end("FEED");
//     } else {
//       req.statusCode = 400;
//       req.end("404 PAGE NOT FOUND");
//     }
//   })
//   .listen("3000", () => console.log("START SERVER"));

const url = require("url");
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => console.log("refactoring node to express"));

app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
  const user = url.parse(req.url, true).query;
  res.json(`[user] name: ${user.name}`);
}

function feed(_, res) {
  res.set({
    "Content-Type": "text/html; charset=utf-8",
  });
  res.json(
    `
      <ul>
        <li>temp1</li>
        <li>temp2</li>
        <li>temp3</li>
      </ul>
    `
  );
}
