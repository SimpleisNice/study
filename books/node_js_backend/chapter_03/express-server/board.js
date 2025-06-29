const express = require("express");
const app = express();
const PORT = 3000;

let posts = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * path: '/'
 * method: GET
 * description: 게시판 목록을 가져옴
 */
app.get("/", (req, res) => {
  res.json(posts);
});

/**
 * path: '/posts'
 * method: POST
 * description: 게시판에 글을 작성함
 * - id, title, name, tex, createdDt
 */
app.post("/posts", (req, res) => {
  const { title, name, text } = req.body;

  posts.push({
    id: posts.length + 1,
    title,
    name,
    text,
    createdDt: Date(),
  });

  res.json({ title, name, text });
});

/**
 * path: '/posts/:id'
 * method: DELETE
 * description: 게시판에서 글을 삭제함
 */
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  const filteredPosts = posts.filter((post) => post.id !== +id);
  const isLengthChanged = posts.length !== filteredPosts.length;

  posts = filteredPosts;

  if (isLengthChanged) {
    res.json("OK");
    return;
  }
  res.json("NOT CHANGED");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
