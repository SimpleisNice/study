const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.set({
    "Content-Type": "text/html; charset=utf-8"
  })
  res.end('hello express');
})

app.listen(port, () => {
  console.log(`express server start: use ${port}`)
})