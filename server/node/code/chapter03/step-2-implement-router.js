const http = require('http');
const url = require('url');

http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (path === '/user') {
    res.end('[user] nane: andy, age: 30');
  } else if (path === '/feed') {
    res.end(`
      <ul>
        <li>temp 1</li>
        <li>temp 2</li>
        <li>temp 3</li>
      </ul>
    `);
  } else {
    res.statusCode = 404;
    res.end("404 page not found");
  }
}).listen(8000, () => console.log('create router'));
