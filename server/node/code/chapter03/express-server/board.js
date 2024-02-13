const express = require('express');
const url = require('url');
const app = express();
const port = 3000;

let posts = [];

// req.body를 사용하려면 json 미들웨어를 사용해야한다.
// 사용하지 않으면 undefined를 반환
app.use(express.json());
// post 요청시 컨텐트 타입이 application/x-www-form-urlencoded인 경우 파싱
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json(posts)
});

app.post('/posts', (req, res) => {
  const { title, name, text } = req.body;
  posts.push({
    id: posts.length + 1,
    title,
    name,
    text,
    createdDt: Date()
  });
  res.json({ title, name, text });
});

app.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  const filteredPosts = posts.filter((post) => post.id !== +id);
  const isLengthChanged = posts.length !== filteredPosts.length;
  posts = filteredPosts;

  if (isLengthChanged) {
    res.json('OK');
    return;
  }
  res.json("NOT CHNAGED")
});

app.listen(port, () => console.log('SERVICE START'))
