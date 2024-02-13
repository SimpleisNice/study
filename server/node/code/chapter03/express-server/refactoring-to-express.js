const express = require('express');
const url = require('url');

const app = express();
const port = 3000;

app.listen(port, () => console.log('service start'));

app.get('/', (_, res) => res.end('HOME'));
app.get('/user', user);
app.get('/feed', feed);

function user(req, res) {
  const user = url.parse(req.url, true).query;
  res.json(`[user] name: ${user.name}, age: ${user.age}`)
}

function feed(_, res) {
  res.json(
    `
      <ul>
        <li>temp 1</li>
        <li>temp 2</li>
        <li>temp 3</li>
        <li>temp 4</li>
      </ul>
    `
  )
}