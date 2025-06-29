const url = require("url");
const express = require("express");
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
  const user = url.parse(req.url, true).query;
  res.json(`[user] name: ${user.name}, age: ${user.age}`);
}

function feed(req, res) {
  res.json(`<ul>
    <li>Feed 1</li>
    <li>Feed 2</li>
    <li>Feed 3</li>
  </ul>`);
}
