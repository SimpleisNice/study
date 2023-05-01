const http = require("http");

let count = 0;

const server = http.createServer((req, res) => {
  log(count);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.write("Hello\n");
  res.write("NODE.js!!\n");
  setTimeout(() => {
    res.end("NODE.js");
  }, 2000);
});

function log(count) {
  console.log((count += 1));
}

server.listen(8000);
