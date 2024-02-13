const http = require('http');
const url = require('url');

http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (path === '/user') {
    user(req, res);
  } else if (path === '/feed') {
    feed(req, res);
  } else {
    notFound(req, res);
  }
}).listen(8000, () => console.log('create router'));

const user = (req, res) => {
  const userInfo = url.parse(req.url, true).query;
  res.end(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
}

const feed = (req, res) => {
  res.end(`
    <ul>
      <li>temp 1</li>
      <li>temp 2</li>
      <li>temp 3</li>
    </ul>
  `);
}

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end('404 page not found');
}